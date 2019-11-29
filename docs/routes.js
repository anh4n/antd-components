import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Typography } from './pages/Typography';
import { FormComponent } from './pages/Form';
import { FlyoutNavigationComponent, SideNavigationComponent } from './pages/Navigation';
import { DataGridComponent, FormGridComponent } from './pages/Grid';
import { Buttons } from './pages/Buttons';
import { ListFieldComponent } from './pages/ListField';
import { EditorComponent } from './pages/Editor';
import { CodeMirrorComponent } from './pages/CodeMirror';
import { UploadComponent } from './pages/Upload';
import { MotionDrawerComponent } from './pages/MotionDrawer';
import { SelectComponent } from './pages/Select';
import { LayoutHeader } from './pages/Layout';

export const routes = [
    {
        key: 'home',
        label: 'Home',
        exact: true,
        path: '/',
        component: Home
    },
    {
        key: 'buttons',
        label: 'Buttons',
        path: '/Buttons',
        component: Buttons
    },
    {
        key: 'typography',
        label: 'Typography',
        path: '/Typography',
        component: Typography
    },
    {
        key: 'data-entry',
        label: 'Data Entry',
        path: '/DataEntry',
        submenu: [
            {
                key: 'form',
                label: 'Form',
                path: '/Form',
                component: FormComponent
            },
            {
                key: 'listField',
                label: 'List Field',
                path: '/ListField',
                component: ListFieldComponent
            },
            {
                key: 'editor',
                label: 'Editor',
                path: '/Editor',
                component: EditorComponent
            },
            {
                key: 'codeMirror',
                label: 'Code Mirror',
                path: '/CodeMirror',
                component: CodeMirrorComponent
            },
            {
                key: 'upload',
                label: 'Upload',
                path: '/Upload',
                component: UploadComponent
            },
            {
                key: 'select',
                label: 'Select',
                path: '/Select',
                component: SelectComponent
            }
        ],
    },
    {
        key: 'grid',
        label: 'Grid',
        path: '/Grid',
        submenu: [
            {
                key: 'dataGrid',
                label: 'Data Grid',
                path: '/DataGrid',
                component: DataGridComponent
            },
            {
                key: 'formGrid',
                label: 'Form Grid',
                path: '/FormGrid',
                component: FormGridComponent
            }
        ],
    },
    {
        key: 'layout',
        label: 'Layout',
        path: '/Layout',
        submenu: [
            {
                key: 'header',
                label: 'Header',
                path: '/Header',
                component: LayoutHeader
            },
        ],
    },
    {
        key: 'navigation',
        label: 'Navigation',
        path: '/Navigation',
        submenu: [
            {
                key: 'flyout',
                label: 'Flyout',
                path: '/Flyout',
                component: FlyoutNavigationComponent
            },
            {
                key: 'side',
                label: 'Side Navi',
                path: '/Side',
                component: SideNavigationComponent
            }
        ],
    },
    {
        key: 'drawer',
        label: 'Motion Drawer',
        path: '/MotionDrawer',
        component: MotionDrawerComponent
    },
    {
        key: 'notfound',
        component: NotFound,
        hideInMenu: true
    }
];
