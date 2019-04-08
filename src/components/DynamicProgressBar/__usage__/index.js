import React from 'react';
import { Heading } from '@lux/components';
import DynamicProgressBar from '..';


const TestDynamicProgressBarStory = () => (
    <DynamicProgressBar>
        <Heading level={2}>{"Vicky's Demo Dynamic Progress Bar"}</Heading>
    </DynamicProgressBar>
);

export default TestDynamicProgressBarStory;
export const name = "DynamicProgressBar";