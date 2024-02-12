const axios = require('axios');

exports.main = async () => {
  // console.log("we are connected");
  const TABLE_ID = '14430732';
  const ROW_ID = '155745382401';
  const COLUMN_NAME = 'opacity';
  const Bearer = process.env['hubdb'];
  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Bearer}`
    }
  });

  const getRow = async () => {
    const url = `https://api.hubapi.com/cms/v3/hubdb/tables/${TABLE_ID}/rows/${ROW_ID}`;
    try {
      const response = await axiosInstance.get(url);
      console.log('Successfully fetched row:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching row:', error);
      throw error;
    }
  };

  const updateRow = async (row) => {
    const url = `https://api.hubapi.com/cms/v3/hubdb/tables/${TABLE_ID}/rows/${ROW_ID}/draft`;
    try {
      const response = await axiosInstance.patch(url, { values: { [COLUMN_NAME]: parseFloat(row.values[COLUMN_NAME].toFixed(1)) + 0.10 } });
      console.log('Successfully updated row:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating row:', error);
      throw error;
    }
  };
  const publishTable = async () => {
    const url = `https://api.hubapi.com/cms/v3/hubdb/tables/${TABLE_ID}/draft/publish`;
    console.log(`Attempting to publish table with ID ${TABLE_ID}`);
    try {
      const response = await axiosInstance.post(url);
      console.log('Successfully published table:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating row:', error);
      throw error;
    }
  };

  try {
    const row = await getRow();
    const updatedRow = await updateRow(row);
    const publish = await publishTable(row);

    return { statusCode: 200, body: JSON.stringify(updatedRow) };
  } catch (error) {
    return { statusCode: 500, body: 'An error occurred' };
  }
};