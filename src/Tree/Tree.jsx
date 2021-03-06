import React, { forwardRef, Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tree as AntdTree } from 'antd';
import nanoid from 'nanoid';
import { emptyFn } from '@root/helper';
import { AddButton, DeleteButton, EditButton } from '@root/Buttons';
import { TreeFormModal } from '@root/Tree/Form';
import { PureArray } from '@root/array';
import { isEmpty } from '@root/object';
import {Search} from '@root/Tree/Search';
import {renderNodes} from '@root/Tree/helper';

export const Tree = forwardRef((props, ref) => {
    const {
        tree = [],
        expandedKeys,
        onAdd,
        onDelete,
        onDrop,
        onSave,
        onSelect,
        onChange,
        searchable,
        editable,
        formItems,
        defaultExpandAll,
        ...restProps
    } = props;

    const [data, setData] = useState(tree);
    const [snapshot, setSnapshot] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNode, setSelectedNode] = useState({});
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [expandedKeysData, setExpandedKeysData] = useState(expandedKeys);

    useEffect(() => {
        setData(tree);
    }, [tree]);

    useEffect(() => {
        onChange(data);
    }, [data]);

    const onDropEvent = (event) => {
        const { eventKey: sourceKey } = event.dragNode.props;
        const { eventKey: targetKey, pos } = event.node.props;

        const dropPos = pos.split('-');
        const dropPosition = event.dropPosition - Number(dropPos[dropPos.length - 1]);

        const updatedTree = PureArray.moveInTree(data, sourceKey, targetKey, dropPosition);

        if (onDrop) {
            onDrop(sourceKey, targetKey, updatedTree)
                .then(() => {
                })
                .catch(() => {
                    setData(tree);
                });
        } else {
            setData(updatedTree);
        }
    };

    const onSearchChange = (expanded, value) => {
        setExpandedKeysData(expanded);
        setSearchValue(value);
    };

    const onExpand = expandedKeys => {
        setExpandedKeysData(expandedKeys);
    };

    let expandConfig = {
        expandedKeys: expandedKeysData
    };

    if (defaultExpandAll) {
        expandConfig = {
            defaultExpandAll: defaultExpandAll
        };
    }

    const onAddBtnClick = () => {
        const defaults = {
            key: nanoid(10),
            label: ''
        };

        const paraentId = selectedNode.key;
        const record = { ...defaults, ...onAdd(defaults) };

        setSnapshot(data);

        setData(
            PureArray.insertInTree(data, paraentId, record)
        );

        setSelectedNode(record);
        setSelectedKeys([record.key]);
        setModalVisible(true);
    };

    const onEditBtnClick = () => {
        setSnapshot(data);
        setModalVisible(true);
    };

    const onDeleteBtnClick = () => {
        const nodeId = selectedNode.key;
        const updatedTree = PureArray.removeInTree(data, nodeId);

        if (onDelete) {
            onDelete(nodeId, updatedTree)
                .then(() => {
                    setSelectedNode({});
                })
                .catch(() => {
                });
        } else {
            setData(updatedTree);
            setSelectedNode({});
        }
    };

    const onSelectNode = (key, e) => {
        let node = key.length > 0 ? e.node.props.data : {};
        setSelectedNode(node);
        setSelectedKeys([node.key]);
        onSelect(node, key, e);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const onCancel = () => {
        setData(snapshot);
        hideModal();
    };

    const onSaveNode = (node) => {
        const nodeId = node.key;
        const updatedTree = PureArray.updateInTree(data, nodeId, node);

        if (onSave) {
            onSave(node, updatedTree)
                .then(() => {
                    setSelectedNode(node);
                    hideModal();
                })
                .catch(() => {
                });
        } else {
            setData(updatedTree);
            setSelectedNode(node);
            hideModal();
        }
    };

    return (
        <Fragment>
            {(searchable) ? <Search tree={tree} onChange={onSearchChange}/> : null}

            {
                (editable)
                    ? <Fragment>
                        <AddButton onClick={onAddBtnClick} size={'small'}/>
                        <EditButton onClick={onEditBtnClick} disabled={isEmpty(selectedNode)} size={'small'}/>
                        <DeleteButton onClick={onDeleteBtnClick} disabled={isEmpty(selectedNode)} size={'small'}/>
                    </Fragment>
                    : null
            }

            <AntdTree
                ref={ref}
                onExpand={onExpand}
                onDrop={onDropEvent}
                onSelect={onSelectNode}
                selectedKeys={selectedKeys}
                {...expandConfig}
                {...restProps}
            >
                {renderNodes(data, searchValue)}
            </AntdTree>

            <TreeFormModal
                formItems={formItems}
                visible={modalVisible}
                onCancel={onCancel}
                onSubmit={onSaveNode}
                record={selectedNode}
            />

        </Fragment>
    );
});

Tree.defaultProps = {
    autoExpandParent: false,
    defaultExpandAll: false,
    editable: false,
    expandedKeys: [],
    searchable: false,
    onAdd: emptyFn,
    onChange: emptyFn,
    onSelect: emptyFn
};

Tree.propTypes = {
    searchable: PropTypes.bool,
    tree: PropTypes.arrayOf(PropTypes.object),
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    onDrop: PropTypes.func,
    onSave: PropTypes.func,
};
