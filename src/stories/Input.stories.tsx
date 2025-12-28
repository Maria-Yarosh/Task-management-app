import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Input,
  type TInputColor,
  type TInputLabelPlacement,
  type TInputRadius,
  type TInputSize,
  type TInputVariant,
} from "../shared/ui/components/Input/Input";
import { Layout, type ILayoutCategory } from "./Layout/Layout";
import { useState } from "react";
import { Icon } from "../shared/ui/components/Icon";
import { Button } from "../shared/ui/components/Button/Button";

interface IInputProps {
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TInputColor;
  radius?: TInputRadius;
  labelPlacement?: TInputLabelPlacement;
  label?: string;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  selected?: boolean;
}

interface IStoryInputData extends IInputProps {
  hint?: string;
}

const InputStories: React.FC<{ data: ILayoutCategory[] }> = ({ data }) => {
  return <Layout title={"Inputs"} data={data} />;
};

const meta: Meta<typeof InputStories> = {
  title: "Inputs",
  component: InputStories,
  parameters: {
    options: { showPanel: false },
  },
};

export default meta;
type Story = StoryObj<typeof InputStories>;

const StoryInput: React.FC<IStoryInputData> = (props) => {
  const [value, setValue] = useState("");
  const [state, setState] = useState(props.selected);

  return (
    <Input
      {...props}
      value={value}
      onChange={(val) => setValue(val)}
      onToggle={(ab) => {setState(ab)}}
      selected={state}
      placeholder={props.placeholder ?? "Type something"}
      endContent={<Button isIconOnly iconName="fa-circle-check" onClick={() => setValue('')} />}
    />
  );
};

export const Default: Story = {
  name: "Inputs",
  args: {
    data: [
      {
        title: "Variants",
        items: [
          { variant: "bordered", hint: "Bordered (Default)" } as const,
          { variant: "underlined", hint: "Underlined" } as const,
        ].map((item, index) => ({
          children: <StoryInput {...item} key={index} />,
          hint: item.hint,
        })), 
      },
      {
        title: "Sizes",
        items: [
          { size: "sm", hint: "Small (Default)" } as const,
          { size: "lg", hint: "Large" } as const,
        ].map((item, index) => ({
          children: <StoryInput {...item} key={index} />,
          hint: item.hint,
        })),
      },
      {
        title: "Colors",
        items: [
          { color: "default", hint: "Default" } as const,
          { color: "primary", hint: "Primary" } as const,
          { color: "success", selected: true, hint: "Success" } as const,
          { color: "warning", hint: "Warning" } as const,
          { color: "danger", hint: "Danger" } as const,
        ].map((item, index) => ({
          children: <StoryInput {...item} key={index} />,
          hint: item.hint,
        })),
      },
      {
        title: "Radiuses",
        items: [
          { radius: "none", hint: "None" } as const,
          { radius: "md", hint: "Medium (Default)" } as const,
          { radius: "full", hint: "Full" } as const,
        ].map((item, index) => ({
          children: <StoryInput {...item} key={index} />,
          hint: item.hint,
        })),
      },
      {
        title: "Label",
        items: [
          { label: "Email", hint: "With label" } as const,
          { label: "Email", isRequired: true, hint: "Required" } as const,
          { label: "Email", labelPlacement: "outside-left", hint: "Label outside left" } as const,
        ].map((item, index) => ({
          children: <StoryInput {...item} key={index} />,
          hint: item.hint,
        })),
      },
      {
        title: "Content",
        items: [
          {
            startContent: <Icon size="sm" name="fa-circle-check" />,
            hint: "Start content",
          },
        //   {
        //     endContent: <Icon size="inherit" name="fa-circle-check" />,
        //     hint: "End content",
        //   },
        //   {
        //     startContent: <Icon size="inherit" name="fa-circle-check" />,
        //     endContent: <Icon size="inherit" name="fa-circle-check" />,
        //     hint: "Start + End content",
        //   },
        ].map((item, index) => ({
          children: <StoryInput {...item} key={index} />,
          hint: item.hint,
        })),
      },
      {
        title: "States",
        items: [
          {
            selected: true,
            hint: "Focused (selected)",
          },
          {
            description: "Helper text goes here",
            hint: "With description",
          },
        ].map((item, index) => ({
          children: <StoryInput {...item} key={index} />,
          hint: item.hint,
        })),
      },
    ],
  },
};
