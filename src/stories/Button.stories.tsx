import {type TButtonColor, type TButtonSize, type TButtonRadius, type TButtonType, Button} from '../shared/ui/components/Button/Button';
import type {ReactNode} from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';
import type {TIconName} from '../shared/ui/components/Icon/iconsMap';

import {Layout, type ILayoutCategory} from './Layout/Layout';


interface IButtonProps {
    variant?: TButtonType;
    color?: TButtonColor;
    size?: TButtonSize;
    radius?: TButtonRadius;
    isIconOnly?: boolean;
    isLoading?: boolean;
    iconName?: TIconName;
    startContent?: ReactNode;
    endContent?: ReactNode;
    children?: ReactNode;
    fullWidth?: boolean;
    className?: string;
    disabled?: boolean;
}

interface IStoryButtonData extends IButtonProps {
    hint?: string;
}

const ButtonsStories: React.FC<{data: ILayoutCategory[]}> = ({data}) => {
    return (
        <Layout
            title={'Buttons'}
            data={data}
        />
    )
}

const meta: Meta<typeof ButtonsStories> = {
    title: 'Buttons',
    component: ButtonsStories,
    parameters: {options: {showPanel: false}}
};

export default meta;
type Story = StoryObj<typeof ButtonsStories>;


const StoryButton: React.FC<IStoryButtonData> = (props) => {
    return <Button {...props}>Button</Button>;
}

export const Default: Story = {
    name: 'Buttons',
    args: {
        data: [
            {
                title: 'Sizes',
                items: [
                    {size: 'lg', hint: 'Large (Default)'} as const,
                    {size: 'md', hint: 'Medium'} as const,
                    {size: 'sm', hint: 'Small'} as const,
                    {size: 'lg', hint: 'Large (Full Width)', fullWidth: true} as const,
                ].map((item, index) => ({children: <StoryButton {...item} key={index}/>, hint: item.hint})),
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
                    {color: 'primary', hint: 'Primary (Full Width)', fullWidth: true} as const,
                ].map((item, index) => ({children: <StoryButton {...item} key={index}/>, hint: item.hint})),
            },
            {
                title: 'Radiuses',
                items: [
                    {radius: 'none', hint: 'None'} as const,
                    {radius: 'sm', hint: 'Small'} as const,
                    {radius: 'md', hint: 'Medium (Default)'} as const,
                    {radius: 'lg', hint: 'Large'} as const,
                    {radius: 'full', hint: 'Full'} as const,
                    {radius: 'md', hint: 'Medium (Full Width)', fullWidth: true} as const,
                ].map((item, index) => ({children: <StoryButton {...item} key={index}/>, hint: item.hint})),
            },
            {
                title: 'Disabled State',
                items: [
                    {disabled: true, color: 'default', hint: 'Default Disabled'} as const,
                    {disabled: true, color: 'primary', hint: 'Primary Disabled'} as const,
                    {disabled: true, color: 'success', hint: 'Success Disabled'} as const,
                    {disabled: true, color: 'danger', hint: 'Danger Disabled'} as const,
                    {disabled: true, color: 'primary', hint: 'Primary Disabled (Full Width)', fullWidth: true} as const,
                ].map((item, index) => ({children: <StoryButton {...item} key={index}/>, hint: item.hint})),
            },
            {
                title: 'Icon Only Buttons',
                items: [
                    {isIconOnly: true, iconName: 'io-arrow-forward', hint: 'GitHub Icon'} as const,
                    {isIconOnly: true, iconName: 'md-settings', color: 'success', hint: 'Settings Icon (Success)'} as const,
                    {isIconOnly: true, iconName: 'md-notifications', size: 'lg', hint: 'Arrow Icon (Large)'} as const,
                    {isIconOnly: true, iconName: 'io-rocket', hint: 'React Icon (Full Width)', fullWidth: true} as const,
                    {isIconOnly: true, iconName: 'io-rocket', hint: 'React Icon (Full Width)', fullWidth: true, disabled: true} as const,
                ].map((item, index) => ({children: <StoryButton {...item} key={index}/>, hint: item.hint})),
            },
            {
                title: 'Variants',
                items: [
                    {variant: 'solid', color: 'primary', hint: 'Solid Primary (Default)'} as const,
                    {variant: 'bordered', color: 'primary', hint: 'Bordered Primary'} as const,
                    {variant: 'light', color: 'primary', hint: 'Light Primary'} as const,
                    {variant: 'flat', color: 'primary', hint: 'Flat Primary'} as const,
                    {variant: 'faded', color: 'primary', hint: 'Faded Primary'} as const,
                    {variant: 'shadow', color: 'primary', hint: 'Shadow Primary'} as const,
                    {variant: 'ghost', color: 'primary', hint: 'Ghost Primary'} as const,
                    {variant: 'solid', color: 'primary', hint: 'Solid Primary (Full Width)', fullWidth: true} as const,
                ].map((item, index) => ({children: <StoryButton {...item} key={index}/>, hint: item.hint})),
            },
        ],
    }
};

