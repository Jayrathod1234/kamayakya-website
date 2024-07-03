import Image from "next/image";

type TFeatureListDesktop = {
    bulletIcon: string;
    feature: React.ReactNode;
};

export const FeatureListDesktop = ({bulletIcon, feature}: TFeatureListDesktop) => {
    return (
        <li className=" flex gap-3 items-start text-gray-950 m-0 leading-6">
            <Image className="mt-1" height={22} width={22} alt="list-icon" src={bulletIcon}/>
            {feature}
        </li>
    );
};
