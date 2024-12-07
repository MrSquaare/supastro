import type { FC } from "react";

type Props = {
  dataTarget: string;
  initialValue: string;
};

const ReactCard: FC<Props> = ({ dataTarget, initialValue }) => {
  return (
    <div
      className={
        "flex w-full flex-col items-center rounded-base border-2 border-border bg-blue-400 p-4 text-black shadow-light"
      }
    >
      <h3 className="mb-2 text-2xl font-bold">React</h3>
      <p
        data-value
        data-target={dataTarget}
        className="mb-4 text-8xl font-bold"
      >
        {initialValue}
      </p>
    </div>
  );
};

export default ReactCard;
