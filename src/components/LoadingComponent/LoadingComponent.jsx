import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from '@ant-design/icons';

export const LoadingComponent = () => {
    return <>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} />} />
    </>;
}