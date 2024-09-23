import type { GetProp, TableProps, TransferProps } from 'antd';
import { Table } from 'antd';

export type TransferItem = GetProp<TransferProps, 'dataSource'>[number];

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

export default function CustomTable(props: any) {
    const {
        targetKeys,
        direction,
        leftColumns,
        rightColumns,
        listDisabled,
        onItemSelectAll,
        listSelectedKeys,
        filteredItems,
        onItemSelect
    } = props

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
    )
}


