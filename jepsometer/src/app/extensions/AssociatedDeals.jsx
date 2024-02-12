import React from "react";
import { hubspot, Button } from "@hubspot/ui-extensions";
import { Layout } from "./components/Layout";
import { Stats } from "./components/Stats";
import { Clicker } from "./components/Clicker";
import { DealPanel } from "./components/DealPanel";
import { DealPanelInner } from "./components/DealPanelInner";


hubspot.extend(({ runServerlessFunction }) => (
  <Extension
    runServerless={runServerlessFunction}
  />
));

const Extension = ({ runServerless }) => {
  const handleClick = async () => {
    const { response } = await runServerless({ name: "jepsonupdater" });
  };
  return (
    <>
      <DealPanel paneltitle={'More than 1000 dollars'} panelId={"big-panel"} customFooter={"I am custom"}>
        <DealPanelInner panelSubtitle="Check out these big deals" operator={'GT'} />
      </DealPanel>
      <DealPanel paneltitle={"Less than 1000 dollars"} panelId={"little-panel"}>
        <DealPanelInner panelSubtitle="Check out these little deals" operator={'LT'} />
      </DealPanel>
      <Layout
        stats={<Stats statTitle={'Count of deals over 1000 dollars'} operator={'GT'} />}
        clicker={<Clicker panelId={"big-panel"} />} />
      <Layout
        stats={<Stats statTitle={'Count of deals under 1000 dollars'} operator={'LT'} />}
        clicker={<Clicker panelId={"little-panel"} />} />
      <Button onClick={handleClick}>
        Jepson Button
      </Button>
    </>
  )
}