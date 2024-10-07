import { Tabs, TabsVariant } from "@/components.v2/tabs";
import { useTrackRecord } from "@/contexts/trackRecordContext";

const TrackRecordTabSection = () => {
  const { sebiBoardType, setSebiBoardType } = useTrackRecord();
  console.log(sebiBoardType);
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
        setSelectedOption={setSebiBoardType}
        activeValue={sebiBoardType}
      />
    </div>
  );
};

export default TrackRecordTabSection;
