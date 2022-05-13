import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useState, useEffect } from 'react';
import JsonMenu from './menu.json';
import { Typography } from '@material-ui/core';


function RecursiveTreeView(props) {

const [menu, setMenu] = useState(JsonMenu);

const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
    },
});

const handleTreeItemClick = (ele, node) => {
    // props.toggleMenu();
    console.log('menu is', ele, node)
    // var url = node.url;
    // if (node.children.length === 0) {
    //     if (url === null) {
    //         // do nothing
    //         // chrome.tabs.create({ url: newURL });
    //     } 
    //     // If the url starts with http, do not add the prefix
    //     else if (/^(http)/.test(url)){
    //         // chrome.tabs.create({ url: newURL });
    //         window.open(url, "_blank");
    //     } else {
    //         // chrome.tabs.create({ url: newURL });
    //         window.open(menu.prefix + url, "_blank");
    //     }
    // }
  
}

const classes = useStyles();

    const renderTree = (node) => {
        // // // console.log(node.children.length)
        // if (node.children.length > 0 && node.url !== null) {
        //     // console.log('inside')
        //     const newNode = {
        //         id : node.id,
        //         name : node.name,
        //         url : node.url,
        //         children: []
        //     }
        //     return (
        //         <TreeItem key={node.id.toString()} nodeId={node.id.toString()} label={node.name}>
        //             {/* <TreeItem key={newNode.id.toString()} nodeId={newNode.id.toString()} label={newNode.name}></TreeItem> */}
        //             {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
        //         </TreeItem>
        //     ) 
        // } else {
        //     return (
        //         <TreeItem key={node.id.toString()} nodeId={node.id.toString()} label={node.name}>
        //             {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
        //         </TreeItem>
        //     )
        // }
        return (
            // <TreeItem key={node.id.toString()} nodeId={node.id.toString()} label={node.name} onLabelClick={() => handleTreeItemClick(node)}>
            //         {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
            //     </TreeItem>
            <TreeItem key={node.id.toString()} nodeId={node.id.toString()} label={node.name}>
                    {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
                    {/* <Typography>hello</Typography> */}
                </TreeItem>
        )
    };

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect = {(ele,node)=>{handleTreeItemClick(ele,node)}}
        >
            {renderTree(menu)}
        </TreeView>
    );

}
export default RecursiveTreeView;
    