import type { Meta, StoryObj } from "@storybook/react-vite";
import { Layout, type ILayoutCategory } from "./Layout/Layout";
import { Alert, type TAlertColor, type TAlertRadius } from "../shared/ui/components/Alert/Alert";
import type { TIconName } from "../shared/ui/components/Icon/iconsMap";


interface IAlertProps {
    color?: TAlertColor;
    radius?: TAlertRadius;
    title?: string;
    description?: string;
    iconName?: TIconName;
    showClose?:boolean;
    showActions?: boolean;
    className?: string;
}

interface IStoryAlertData extends IAlertProps {
    hint?: string;
}

const AlertStories: React.FC<{data: ILayoutCategory[]}> = ({data}) => {
    return (
        <Layout
            title={'Alerts'}
            data={data}
        />
    )
}

const meta: Meta<typeof AlertStories> = {
    title: 'Alerts',
    component: AlertStories,
    parameters: {options: {showPanel: false}}
};

export default meta;
type Story = StoryObj<typeof AlertStories>;


const StoryAlert: React.FC<IStoryAlertData> = ({ color, ...rest}) => {
    return <Alert color={color} {...rest}></Alert>
}

export const Default: Story = {
    name: 'Alerts',
    args: {
        data: [
            {
                title: 'Colors',
                items: [
                    {color: 'default', hint: 'Default'} as const,
                    {color: 'primary', hint: 'Primary'} as const,
                    {color: 'secondary', hint: 'Secondary'} as const,
                    {color: 'success', hint: 'Success'} as const,
                    {color: 'warning', hint: 'Warning'} as const,
                    {color: 'danger', hint: 'Danger'} as const,
                ].map((item, index) => ({children: <StoryAlert {...item} key={index}/>, hint: item.hint})),
            },
            {
                title: 'Radiuses',
                items: [
                    {radius: 'none', hint: 'None'} as const,
                    {radius: 'sm', hint: 'Small'} as const,
                    {radius: 'md', hint: 'Medium (Default)'} as const,
                    {radius: 'lg', hint: 'Large'} as const,
                    {radius: 'full', hint: 'Full'} as const,
                ].map((item, index) => ({children: <StoryAlert {...item} key={index}/>, hint: item.hint})),
            },
            {
                title: 'Content',
                items: [
                    {title: "Email sent", hint: "with title"},
                    {description: "You will get a reply soon", hint: "with description"},
                    {iconName: "fa-smile-wink" as TIconName, hint: 'with icon'}, 
                    {showClose: true, hint: "with close"},
                    {showActions: true, hint: "with actions"},
                    {showClose: true, showActions: true, hint: "with close and actions"},
                    {showClose: true, title: "Email sent", description: "You will get a reply soon", iconName: "fa-circle-check" as TIconName, showActions: true, hint: "with all content"}
                ].map((item, index) => ({children: <StoryAlert {...item} key={index} />, hint: item.hint}))
            },
        ],
    }
}