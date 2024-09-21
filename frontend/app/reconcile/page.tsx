"use client"
import { LogoWordComponent } from '@/app/components/shared/atoms';
import { ProfileForm } from '@/app/components/specific/profile';
import { AreaChartOutlined, DownOutlined, InboxOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps, UploadProps } from 'antd';
import { Avatar, Breadcrumb, Button, Dropdown, Flex, Layout, Menu, message, Segmented, theme, Typography, Upload } from 'antd';
import React, { useState } from 'react';


import type { DragEndEvent } from '@dnd-kit/core';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
    arrayMove,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { GetProp, TableColumnsType, TableProps, TransferProps } from 'antd';
import { Table, Transfer, Tag } from 'antd';




const { Dragger } = Upload;

const { Header, Content, Sider } = Layout;

type TransferItem = GetProp<TransferProps, 'dataSource'>[number];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

interface DataType {
    key: string;
    title: string;
    description: string;
    tag: string;
}

interface TableTransferProps extends TransferProps<TransferItem> {
    dataSource: DataType[];
    leftColumns: TableColumnsType<DataType>;
    rightColumns: TableColumnsType<DataType>;
}

const mockTags = ['cat', 'dog', 'bird'];


// @ts-ignore
const mockData = Array.from({ length: 20 }).map<DataType>((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    tag: mockTags[i % 3],
}));



// Customize Table Transfer
const TableTransfer: React.FC<TableTransferProps> = (props) => {
    const { leftColumns, rightColumns, ...restProps } = props;
    return (
        <Transfer style={{ width: '100%' }} {...restProps}>
            {({
                direction,
                filteredItems,
                onItemSelect,
                onItemSelectAll,
                selectedKeys: listSelectedKeys,
                disabled: listDisabled,
            }) => {
                const columns = direction === 'left' ? leftColumns : rightColumns;
                const rowSelection: TableRowSelection<TransferItem> = {
                    getCheckboxProps: () => ({ disabled: listDisabled }),
                    onChange(selectedRowKeys) {
                        onItemSelectAll(selectedRowKeys, 'replace');
                    },
                    selectedRowKeys: listSelectedKeys,
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
                };

                return (
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={filteredItems}
                        size="small"
                        style={{ pointerEvents: listDisabled ? 'none' : undefined }}
                        onRow={({ key, disabled: itemDisabled }) => ({
                            onClick: () => {
                                if (itemDisabled || listDisabled) {
                                    return;
                                }
                                onItemSelect(key, !listSelectedKeys.includes(key));
                            },
                        })}
                    />
                );
            }}
        </Transfer>
    );
};

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
}

const Row = (props: RowProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: props['data-row-key'],
    });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: 'move',
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

function ProfileDetails() {
    return (
        <Flex className="flex-col gap-2">
            <Flex className="flex-col">
                <Typography.Text>Profile Avatar</Typography.Text>
                <Flex className="items-center gap-4">
                    <Avatar style={{ width: 60, height: 60 }}>
                        A
                    </Avatar>
                    <Button>Change Avatar</Button>
                </Flex>
            </Flex>
            <Flex className="w-full">
                <ProfileForm />
            </Flex>
        </Flex>
    )
}

function Dashboard() {
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address:
                'Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ]);


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
                distance: 1,
            },
        }),
    );

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setDataSource((prev) => {
                const activeIndex = prev.findIndex((i) => i.key === active.id);
                const overIndex = prev.findIndex((i) => i.key === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
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

    const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);
    const [disabled, setDisabled] = useState(false);

    const onChange: TableTransferProps['onChange'] = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const toggleDisabled = (checked: boolean) => {
        setDisabled(checked);
    };


    return (
        <Flex className="flex-col">
            <Flex className="w-full justify-center">
                <Segmented<string>
                    defaultValue="New Reconcilliation"
                    options={['New Reconcilliation', 'Past Reconcilliations']}
                    onChange={(value) => {
                        console.log(value); // string
                    }}
                />
            </Flex>
            <Flex className="justify-between mt-6 gap-6">
                <Flex className="w-full flex-col gap-2">
                    <Typography.Text>Source Records</Typography.Text>
                    <Dragger {...props} className="w-full">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text"> Click or drag file to this area to upload </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload.Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>

                    {/* <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd} >
                        <SortableContext
                            // rowKey array
                            items={dataSource.map((i) => i.key)}
                            strategy={verticalListSortingStrategy}
                        >
                            <Table
                                components={
                                    {
                                        body: {
                                            row: Row,
                                        },
                                    }
                                }
                                className='mt-6'
                                rowKey="key"
                                columns={columns}
                                dataSource={dataSource}
                            />
                        </SortableContext>
                    </DndContext> */}
                </Flex>
                <Flex className="w-full flex-col gap-2">
                    <Typography.Text>Target Records</Typography.Text>
                    <Dragger {...props} className="w-full mb-12">
                        <p className="ant-upload-drag-icon" >
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text"> Click or drag file to this area to upload </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload.Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>

                    {/* <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd} >
                        <SortableContext
                            // rowKey array
                            items={dataSource.map((i) => i.key)}
                            strategy={verticalListSortingStrategy}
                        >
                            <Table
                                components={
                                    {
                                        body: {
                                            row: Row,
                                        },
                                    }
                                }
                                rowKey="key"
                                className='mt-6'
                                columns={columns}
                                dataSource={dataSource}
                            />
                        </SortableContext>
                    </DndContext> */}
                </Flex>
            </Flex>
            <Flex className="mt-6">
                <TableTransfer
                    dataSource={mockData}
                    targetKeys={targetKeys}
                    disabled={disabled}
                    showSearch
                    showSelectAll={false}
                    onChange={onChange}
                    filterOption={filterOption}
                    leftColumns={columns}
                    rightColumns={columns}
                />
            </Flex>
        </Flex>
    )
}

export default function ReconcilePage() {

    const [current, setCurrent] = useState('dashboard');

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onClick: MenuProps['onClick'] = ({ key }) => {
        const isLogout = key === "logout"
        setCurrent(key)

        if (isLogout) {
            message.error(`Click on item ${key}`);
        } else {
            message.info(`Click on item ${key}`);
        }
    };

    const profileDropdownItems: MenuProps['items'] = [
        {
            label: 'Dashboard',
            key: 'dashboard',
            icon: <AreaChartOutlined />
        },
        {
            label: 'View Profile',
            key: 'profile',
            icon: <UserOutlined />
        },
        {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />

        }
    ]

    const isDashbaoard = current === "dashboard"
    const isProfile = current === "profile"

    return (
        <Layout>
            <Header
                className="flex items-center justify-between"
                style={{ backgroundColor: colorBgContainer }}
            >
                <LogoWordComponent />
                <Dropdown menu={{ items: profileDropdownItems, onClick }}>
                    <Flex className="gap-2">
                        <Avatar style={{ verticalAlign: 'middle' }
                        } size="large">
                            A
                        </Avatar>
                        < DownOutlined />
                    </Flex>
                </Dropdown>
            </Header>
            <Layout className="h-screen mx-6 my-4">
                <Sider className="rounded-md px-4" width={300} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['dashboard']}
                        style={{ borderRight: 0, marginTop: 20 }}
                        items={profileDropdownItems}
                        onClick={onClick}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {isDashbaoard && "Dashboard"}
                            {isProfile && "Profile"}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {isDashbaoard && (
                            <Dashboard />
                        )}
                        {isProfile && (
                            <ProfileDetails />
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
