import type { TableColumnsType, TransferProps } from 'antd';
import { Tag, Transfer } from "antd";
import { useState } from "react";
import CustomTable, { TransferItem } from "./Table";

const mockTags = ['cat', 'dog', 'bird'];

// @ts-ignore
const mockData = Array.from({ length: 20 }).map<DataType>((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    tag: mockTags[i % 3],
}));


interface DataType {
    key: string;
    title: string;
    description: string;
    tag: string;
}


interface TableTransferProps extends TransferProps<TransferItem> {
    data: any;
}

export default function TableTransfer(props: TableTransferProps) {
    const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);

    const onChange: TableTransferProps['onChange'] = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const filterOption = (input: string, item: DataType) =>
        item.title?.includes(input) || item.tag?.includes(input);


    const columns: TableColumnsType<DataType> = [
        {
            dataIndex: 'title',
            title: 'Name',
        },
        {
            dataIndex: 'tag',
            title: 'Tag',
            render: (tag: string) => (
                <Tag style={{ marginInlineEnd: 0 }} color="cyan">
                    {tag.toUpperCase()}
                </Tag>
            ),
        },
        {
            dataIndex: 'description',
            title: 'Description',
        },
    ];

    const { data, ...restProps } = props;
    return (
        <Transfer style={{ width: '100%' }} {...restProps}
            onChange={onChange}
            dataSource={data}
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
                        leftColumns={columns}
                        rightColumns={columns}
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