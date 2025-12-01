import { Avatar, type TAvatarColor, type TAvatarRadius, type TAvatarSize, type TAvatarText } from "../shared/ui/components/Avatar/Avatar";
import { Layout, type ILayoutCategory } from "./Layout/Layout";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TIconName } from "../shared/ui/components/Icon/iconsMap";

interface IAvatarProps {
    color?: TAvatarColor;
    size?: TAvatarSize;
    radius?: TAvatarRadius;
    iconName?: TIconName;
    imageSrc?: string;
    text?: TAvatarText;
    className?: string;
}

interface IStoryAvatarData extends IAvatarProps {
    hint?: string;
}

const AvatarStories: React.FC<{data: ILayoutCategory[]}> = ({data}) => {
    return (
        <Layout
            title={'Avatars'}
            data={data}
        />
    )
}

const meta: Meta<typeof AvatarStories> = {
    title: 'Avatars',
    component: AvatarStories,
    parameters: {options: {showPanel: false}}
};

export default meta;
type Story = StoryObj<typeof AvatarStories>;


const StoryAvatar: React.FC<IStoryAvatarData> = ({ size, ...rest}) => {
    return <Avatar size={size} {...rest}></Avatar>
}

export const Default: Story = {
    name: 'Avatars',
    args: {
        data: [
            {
                title: 'Sizes',
                items: [
                    {size: 'lg', hint: 'Large (Default)'} as const,
                    {size: 'md', hint: 'Medium'} as const,
                    {size: 'sm', hint: 'Small'} as const,
                ].map((item, index) => ({children: <StoryAvatar {...item} key={index}/>, hint: item.hint})),
            },
            {
                title: 'Colors',
                items: [
                    {color: 'default', hint: 'Default'} as const,
                    {color: 'primary', hint: 'Primary'} as const,
                    {color: 'secondary', hint: 'Secondary'} as const,
                    {color: 'success', hint: 'Success'} as const,
                    {color: 'warning', hint: 'Warning'} as const,
                    {color: 'danger', hint: 'Danger'} as const,
                ].map((item, index) => ({children: <StoryAvatar {...item} key={index}/>, hint: item.hint})),
            },
            {
                title: 'Radiuses',
                items: [
                    {radius: 'none', hint: 'None'} as const,
                    {radius: 'sm', hint: 'Small'} as const,
                    {radius: 'md', hint: 'Medium (Default)'} as const,
                    {radius: 'lg', hint: 'Large'} as const,
                    {radius: 'full', hint: 'Full'} as const,
                ].map((item, index) => ({children: <StoryAvatar {...item} key={index}/>, hint: item.hint})),
            },
            {
                title: 'Content',
                items: [
                    {iconName: "fa-smile-wink" as TIconName, hint: 'with icon'}, 
                    {text: {firstName: "Mary", lastName: "Yarosh"}, hint: 'with text'}, 
                    {imageSrc: "src/assets/image.jpg", hint: 'with image'}
                ].map((item, index) => ({children: <StoryAvatar {...item} key={index} />, hint: item.hint}))
            },
        ],
    }
};
