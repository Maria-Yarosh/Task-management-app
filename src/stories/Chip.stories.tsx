import type {ReactNode} from 'react';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {Layout, type ILayoutCategory} from './Layout/Layout';
import { Chip, type TChipColor, type TChipRadius, type TChipSize, type TChipVariant } from '../shared/ui/components/Chip/Chip';
import { Icon } from '../shared/ui/components/Icon';


interface IChipProps {
    variant?: TChipVariant;
    size?: TChipSize;
    color?: TChipColor;
    radius?: TChipRadius;
    children?: ReactNode;
    startContent?: ReactNode;
    endContent?: ReactNode;
    avatar?: ReactNode;
    className?: string;
}

interface IStoryChipData extends IChipProps {
    hint?: string;
}

const ChipStories: React.FC<{data: ILayoutCategory[]}> = ({data}) => {
    return (
        <Layout
            title={'Chips'}
            data={data}
        />
    )
}

const meta: Meta<typeof ChipStories> = {
    title: 'Chips',
    component: ChipStories,
    parameters: {options: {showPanel: false}}
};

export default meta;
type Story = StoryObj<typeof ChipStories>;


const StoryChip: React.FC<IStoryChipData> = ({ size, ...rest}) => {
    return <Chip size={size} {...rest}>Chip</Chip>;
}

export const Default: Story = {
    name: 'Chips',
    args: {
        data: [
            {
                title: 'Sizes',
                items: [
                    {size: 'lg', hint: 'Large (Default)'} as const,
                    {size: 'md', hint: 'Medium'} as const,
                    {size: 'sm', hint: 'Small'} as const,
                ].map((item, index) => ({children: <StoryChip {...item} key={index}/>, hint: item.hint})),
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
                ].map((item, index) => ({children: <StoryChip {...item} key={index}/>, hint: item.hint})),
            },
            {
                title: 'Radiuses',
                items: [
                    {radius: 'none', hint: 'None'} as const,
                    {radius: 'sm', hint: 'Small'} as const,
                    {radius: 'md', hint: 'Medium (Default)'} as const,
                    {radius: 'lg', hint: 'Large'} as const,
                    {radius: 'full', hint: 'Full'} as const,
                ].map((item, index) => ({children: <StoryChip {...item} key={index}/>, hint: item.hint})),
            },
            {
                title: 'Content',
                items: [
                    {startContent: <span>Hello</span>, avatar: <Icon name='md-settings'/>, endContent: <Icon name='io-rocket'/>, hint: 'with Content'}
                ].map((item, index) => ({children: <StoryChip {...item} key={index}/>, hint: item.hint})),
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
                    {variant: 'dot', color: 'primary', hint: 'Dot Primary'} as const,
                ].map((item, index) => ({children: <StoryChip {...item} key={index}/>, hint: item.hint})),
            },
        ],
    }
};

