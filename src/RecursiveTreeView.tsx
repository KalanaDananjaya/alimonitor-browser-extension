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
// const [menuUrls, setMenuUrls] = useState({});
const menuUrls = {}

const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
    },
});



const updatedMenu = (menu) => {
    console.log(menu, menu.children, menu.children.length)
    if (menu.children.length > 0) {
        
        // console.log('actual menu', menu)
        console.log('menu url is', menu.url, menu.url !== "", menu.url !==undefined)
        if (menu.url !== undefined && menu.url !== null && menu.url !== "") {
            const clonedChild = {
                id : menu.id + "X",
                name : menu.name,
                url : menu.url,
                children : []
            }
            menu.url = '';
            menu.children.push(clonedChild)
            console.log('pushed', clonedChild, 'as child of ', menu)
            // add child
            console.log('settign to null', menu.id)
            
        }
    }
    
    var test = menuUrls;
    menuUrls[menu.id] = menu.url;
    // setMenuUrls(menuUrls)
    // console.log('menuUrls',menuUrls)

    if (menu.children.length > 0) {
        // console.log('children exists', menu.children)
        for (let index in menu.children) {
            let child = menu.children[index]
            // console.log('iterating childs', child.id, index, child)
            updatedMenu(child)
        }
        // console.log("finished iterating children of", menu.id);
    } else {
        return
    }
}
useEffect(() => {

    updatedMenu(menu)
    setMenu(menu)
    console.log('update is', menu)
    console.log('final menuUrls is', menuUrls['0'], Object.keys(menuUrls), Object.entries(menuUrls))
  }, []);


// console.log('final menuUrls is', menuUrls)
// setMenuUrls(menuUrls)
// console.log('keys are', menuUrls.keys())


const handleTreeItemClick = (event, nodeId) => {
    // console.log(menu)
    // props.toggleMenu();
    console.log('clicked nodeId is', nodeId, menuUrls[nodeId], "-")
    var url = menuUrls[nodeId];

    if(menuUrls.hasOwnProperty(nodeId)){
        console.log("EXITS")
    } else {
        console.log("NOT EXISTS")
    }
    // if (node.children.length === 0) {
        console.log('url is ', url)
        if (url === null || url ==='' || url === undefined) {
            // do nothing
            // chrome.tabs.create({ url: newURL });
        } 
        // If the url starts with http, do not add the prefix
        else if (/^(http)/.test(url)){
            // chrome.tabs.create({ url: newURL });
            window.open(url, "_blank");
        } else {
            // chrome.tabs.create({ url: newURL });
            window.open(menu.prefix + url, "_blank");
        }
    // }
  
}

const classes = useStyles();

    const renderTree = (node) => {
        return (
            <TreeItem key={node.id.toString()} nodeId={node.id.toString()} label={node.name}>
                    {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
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
    