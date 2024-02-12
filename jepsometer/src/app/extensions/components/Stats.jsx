// first we need to import the Flex component from the ui-extensions package
import { CrmStatistics } from '@hubspot/ui-extensions/crm';

// then we will create a functional component that takes in two props, statTitle and operator
export const Stats = ({ statTitle, operator }) => {
  return (
    <CrmStatistics
      objectTypeId="0-3"
      statistics={[
        {
          label: statTitle,
          statisticType: 'COUNT',
          propertyName: 'amount',
          // The filters below narrow the fetched 
          // deals by the following criteria:
          // - Amount must be >= 1,000
          // - Deal must not be closed
          filterGroups: [
            {
              filters: [
                {
                  operator: operator,
                  property: 'amount',
                  value: 1000,
                },
                {
                  operator: 'NOT_IN',
                  property: 'dealstage',
                  values: ['closedwon', 'closedlost'],
                },
              ],
            },
          ],
        },
      ]}
    />
  );
};