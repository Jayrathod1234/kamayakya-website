import { Tabs, TabsVariant } from "@/components.v2/tabs";
import { useTrackRecordCommon } from "@/contexts/TrackRecordCommonContext";
import { useTrackRecord } from "@/contexts/TrackRecordContext";
import { getMixPanelClient } from "@/externals/mixpanel";
import { useEffect, useState } from "react";

const TrackRecordTabSection = () => {
  const { sebiBoardType, handleSebiBoardTypeChange} = useTrackRecordCommon();
  const [value, setValue] = useState(sebiBoardType);

  const handleTabEvent = (tabSelected:string)=>{
    const mp = getMixPanelClient();
    const eventName = tabSelected?.includes("mainboard") ? "mainboard_clicked" :tabSelected?.includes("sme") ? "smeboard_clicked" : "allboard_clicked" 
    mp.track(eventName, {
      page:"TrackRecord_page"
    });
  }

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      handleSebiBoardTypeChange(value);
    },600)
    
    return ()=>clearTimeout(timeout)

  },[value])
  return (
    <div className=" flex justify-center">
      <Tabs
        responsive={true}
        className=" dark block"
        tabTriggerClassname={` `}
        variant={TabsVariant.lg}
        defaultOption="all"
        options={[
          { label: "All Boards", value: "" },
          { label: "Main Board", value: "mainboard" },
          { label: "SME Board", value: "sme" },
        ]}
        setSelectedOption={setValue}
        activeValue={value}
        event={handleTabEvent}
      />
    </div>
  );
};

export default TrackRecordTabSection;
