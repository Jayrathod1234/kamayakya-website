import { Tabs, TabsVariant } from "@/components.v2/tabs";
import { useTrackRecordCommon } from "@/contexts/TrackRecordCommonContext";
import { useTrackRecord } from "@/contexts/TrackRecordContext";
import { useEffect, useState } from "react";

const TrackRecordTabSection = () => {
  const { sebiBoardType, handleSebiBoardTypeChange} = useTrackRecordCommon();
  const [value, setValue] = useState(sebiBoardType);
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
      />
    </div>
  );
};

export default TrackRecordTabSection;
