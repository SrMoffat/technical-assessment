"use client"

import type { TransferProps } from 'antd';
import { Transfer } from "antd";
import { useEffect, useState } from "react";
import CustomTable, { TransferItem } from "./Table";

interface DataType {
    key: string;
    name: string;
    amount: string;
}


interface TableTransferProps extends TransferProps<TransferItem> {
    headers: any;
    leftColumns: any;
    rightColumns: any;
}

export default function TableTransfer(props: TableTransferProps) {
    const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);

    const onChange: TableTransferProps['onChange'] = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const filterOption = (input: string, item: DataType) =>
        item.name?.includes(input) || item.amount?.includes(input);

    const { leftColumns, rightColumns, headers, dataSource, ...restProps } = props;

    useEffect(() => {
        const targetKeys = dataSource?.filter(item => item.type === "target")
            .map(item => item.key);

        setTargetKeys(targetKeys)
    }, [dataSource])
    return (
        <Transfer style={{ width: '100%' }} {...restProps}
            // status="error" // "warning"
            onChange={onChange}
            dataSource={dataSource}
            targetKeys={targetKeys}
            filterOption={filterOption}
        >
            {({
                direction,
                filteredItems,
                onItemSelect,
                onItemSelectAll,
                selectedKeys: listSelectedKeys,
                disabled: listDisabled,
            }) => {
                return (
                    <CustomTable
                        direction={direction}
                        leftColumns={headers}
                        rightColumns={headers}
                        listDisabled={listDisabled}
                        onItemSelect={onItemSelect}
                        filteredItems={filteredItems}
                        onItemSelectAll={onItemSelectAll}
                        listSelectedKeys={listSelectedKeys}
                    />
                );
            }}
        </Transfer>
    );
};