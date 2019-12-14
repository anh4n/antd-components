import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Input, Tree as AntdTree} from 'antd';
import {emptyFn} from '@root/helper';
import {useL10n as l10n} from '@root/Locales';

const TreeNode = AntdTree.TreeNode;
const Search = Input.Search;

export const Tree = (props) => {
    const {tree, expandedKeys, autoExpandParent, onDrop, onChange, searchable, defaultExpandAll, ...restProps} = props;

    const [treeData, setTreeData] = useState(tree);
    const [searchValue, setSearchValue] = useState('');
    const [expandedKeysData, setExpandedKeysData] = useState(expandedKeys);
    const [isAutoExpandParent, setIsAutoExpandParent] = useState(autoExpandParent);

    const onDropEvent = (event, node, dragNode, dragNodesKeys) => {

        const dropKey = event.node.props.eventKey;
        const dragKey = event.dragNode.props.eventKey;
        const dropPos = event.node.props.pos.split('-');
        const dropPosition = event.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.key === key) {
                    return callback(item, index, arr);
                }
                if (item.submenu) {
                    return loop(item.submenu, key, callback);
                }
            });
        };

        const data = [...treeData];

        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!event.dropToGap) {
            loop(data, dropKey, item => {
                item.submenu = item.submenu || [];
                item.submenu.push(dragObj);
            });
        } else if (
            (event.node.props.submenu || []).length > 0 &&
            event.node.props.expanded &&
            dropPosition === 1
        ) {
            loop(data, dropKey, item => {
                item.submenu = item.submenu || [];
                item.submenu.unshift(dragObj);
            });
        } else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }

        setTreeData(data);
        onDrop(event, node, dragNode, dragNodesKeys);
        onChange(data);
    };

    const getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.submenu) {
                if (node.submenu.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.submenu)) {
                    parentKey = getParentKey(key, node.submenu);
                }
            }
        }
        return parentKey;
    };

    const dataList = [];
    const generateList = data => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const {key, label} = node;
            dataList.push({key, label: label});
            if (node.submenu) {
                generateList(node.submenu);
            }
        }
    };

    generateList(treeData);

    const onSearchChange = e => {
        const {value} = e.target;
        const expanded = dataList.map(item => {
            if (item.label.indexOf(value) > -1) {
                return getParentKey(item.key, treeData);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);

        setExpandedKeysData(expanded);
        setSearchValue(value);
        setIsAutoExpandParent(true);
    };

    const onExpand = expandedKeys => {
        setExpandedKeysData(expandedKeys);
        setIsAutoExpandParent(false);
    };

    const getLabel = (item) => {
        const index = item.label.indexOf(searchValue);
        const beforeStr = item.label.substr(0, index);
        const afterStr = item.label.substr(index + searchValue.length);

        return index > -1 ? (
            <span>{beforeStr}
                <span style={{color: '#f50'}}>{searchValue}</span>
                {afterStr}
                </span>
        ) : (
            <span>{item.label}</span>
        );
    };

    const getNodes = (data) => {
        return data.map(item => {
            let label = getLabel(item);
            if (item.submenu) {
                return (
                    <TreeNode key={item.key} title={label}>
                        {getNodes(item.submenu)}
                    </TreeNode>
                );
            }

            return <TreeNode key={item.key} title={label}/>;
        });
    };

    let expandConfig = {
        expandedKeys: expandedKeysData,
        autoExpandParent: isAutoExpandParent
    };

    if (defaultExpandAll) {
        expandConfig = {
            defaultExpandAll: defaultExpandAll
        }
    }

    return (
        <Fragment>
            {(searchable) ? <Search style={{marginBottom: 8}} placeholder={l10n().Form.searchText}
                                    onChange={onSearchChange}/> : null}
            <AntdTree
                onExpand={onExpand}
                onDrop={onDropEvent}
                {...expandConfig}
                {...restProps}
            >
                {getNodes(treeData)}
            </AntdTree>
        </Fragment>
    );
};

Tree.defaultProps = {
    searchable: false,
    defaultExpandAll: false,
    onDrop: emptyFn,
    onChange: emptyFn,
    tree: [],
    autoExpandParent: false,
    expandedKeys: []
};

Tree.propTypes = {
    searchable: PropTypes.bool,
    onChange: PropTypes.func,
    tree: PropTypes.arrayOf(PropTypes.object),
};
