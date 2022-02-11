import G6 from '../../../src';
import { clone } from '@antv/util';
import dataset from './data';
import { ConcentricLayout, GForceLayout, ForceAtlas2Layout } from '@antv/layout';
import * as d3Force from 'd3-force';
import { isFunction } from 'util';

const data = dataset.comboData;

const rdata = {
  "nodes": [
    {
      "id": "2021052601883396",
      "label": "履约事件",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 0,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021052601883396",
        "myDraft": true,
        "name": "MKG.PaymentEvents",
        "nameZh": "履约事件",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.PaymentEvents",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5AD8A6",
        "typeId": "2021052601883396",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021061602092722",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021042101657968",
      "label": "产品",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 2050102,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021042101657968",
        "myDraft": true,
        "name": "MKG.Product",
        "nameZh": "产品",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.Product",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5B8FF9",
        "typeId": "2021042101657968",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021042001647731",
      "label": "兴趣地址",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 0,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021042001647731",
        "myDraft": true,
        "name": "MKG.InterestPlace",
        "nameZh": "兴趣地址",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.InterestPlace",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#E86452",
        "typeId": "2021042001647731",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-706000074",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021061602092727",
      "label": "热点事件",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 0,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021061602092727",
        "myDraft": true,
        "name": "MKG.HotEvent",
        "nameZh": "热点事件",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.HotEvent",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5AD8A6",
        "typeId": "2021061602092727",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021061602092722",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021061702105197",
      "label": "主题",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 10908,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021061702105197",
        "myDraft": true,
        "name": "MKG.Topic",
        "nameZh": "主题",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.Topic",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5D7092",
        "typeId": "2021061702105197",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647754",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021042101657969",
      "label": "标准化服务",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 1113,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021042101657969",
        "myDraft": true,
        "name": "MKG.StandService",
        "nameZh": "标准化服务",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.StandService",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#F6BD16",
        "typeId": "2021042101657969",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647740",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021053101941874",
      "label": "口碑门店",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 15047828,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021053101941874",
        "myDraft": true,
        "name": "MKG.KoubeiShop",
        "nameZh": "口碑门店",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.KoubeiShop",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#FF99C3",
        "typeId": "2021053101941874",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647749",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021042001647724",
      "label": "功能",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 0,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021042001647724",
        "myDraft": true,
        "name": "MKG.Function",
        "nameZh": "功能",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.Function",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#1E9493",
        "typeId": "2021042001647724",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647754",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021051301783085",
      "label": "间连商户",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 434352936,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021051301783085",
        "myDraft": true,
        "name": "MKG.IndirectMerchant",
        "nameZh": "间连商户",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.IndirectMerchant",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#6DC8EC",
        "typeId": "2021051301783085",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647734",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021042101657967",
      "label": "应用服务",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 2861727,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021042101657967",
        "myDraft": true,
        "name": "MKG.AppService",
        "nameZh": "应用服务",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.AppService",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5D7092",
        "typeId": "2021042101657967",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647740",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021053101941875",
      "label": "淘票票门店",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 11252,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021053101941875",
        "myDraft": true,
        "name": "MKG.TaopiaopiaoShop",
        "nameZh": "淘票票门店",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.TaopiaopiaoShop",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#9FB40F",
        "typeId": "2021053101941875",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647749",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021042101658086",
      "label": "意图",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 3753,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": true,
        "iCopyEdge": false,
        "id": "2021042101658086",
        "myDraft": true,
        "name": "MKG.Intent",
        "nameZh": "意图",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [
          {
            "desc": "通用实体链指算子",
            "iGood": 0,
            "id": 19000090,
            "jarAddress": "",
            "lang": "",
            "mainClass": "",
            "name": "EntityLinker",
            "overviewId": 0,
            "params": "",
            "script": "",
            "transformerEnumCode": "ENTITY_LINK",
            "url": "https://akg.alipay.com/v2/knowledgeBuild/operator/detail?algorithmOverviewId=23000051&operatorId=19000090",
            "version": 1
          }
        ],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.Intent",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#F6BD16",
        "typeId": "2021042101658086",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647754",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021070602724529",
      "label": "电影人",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 1070011,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021070602724529",
        "myDraft": true,
        "name": "MKG.FilmPerson",
        "nameZh": "电影人",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.FilmPerson",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#E86452",
        "typeId": "2021070602724529",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021042001647738",
      "label": "PID",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 422017951,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021042001647738",
        "myDraft": true,
        "name": "MKG.PartnerID",
        "nameZh": "PID",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.PartnerID",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#FF9845",
        "typeId": "2021042001647738",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021081904543901",
      "label": "标准标签",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 754,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021081904543901",
        "myDraft": true,
        "name": "MKG.StandardTag",
        "nameZh": "标准标签",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.StandardTag",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#E86452",
        "typeId": "2021081904543901",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647754",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021042001647723",
      "label": "类目",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 0,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021042001647723",
        "myDraft": true,
        "name": "MKG.Category",
        "nameZh": "类目",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.Category",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#6DC8EC",
        "typeId": "2021042001647723",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647754",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021042001647722",
      "label": "品牌",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 118351,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021042001647722",
        "myDraft": true,
        "name": "MKG.Brand",
        "nameZh": "品牌",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.Brand",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#E86452",
        "typeId": "2021042001647722",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021042001647721",
      "label": "兴趣区域",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 1130850,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021042001647721",
        "myDraft": true,
        "name": "MKG.AOI",
        "nameZh": "兴趣区域",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.AOI",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5B8FF9",
        "typeId": "2021042001647721",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "707000062",
      "label": "国家",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 305000054,
        "dataCount": 237,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "707000062",
        "myDraft": true,
        "name": "Country",
        "nameZh": "国家",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "Country",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#E86452",
        "typeId": "707000062",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021062202192858",
      "label": "标准门店类目",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 517,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021062202192858",
        "myDraft": true,
        "name": "MKG.ShopCategory",
        "nameZh": "标准门店类目",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.ShopCategory",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#6DC8EC",
        "typeId": "2021062202192858",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021053101941871",
      "label": "大麦门店",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 2732,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021053101941871",
        "myDraft": true,
        "name": "MKG.DamaiShop",
        "nameZh": "大麦门店",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.DamaiShop",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#F6BD16",
        "typeId": "2021053101941871",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647749",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021042001647739",
      "label": "兴趣地点",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 87543183,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021042001647739",
        "myDraft": true,
        "name": "MKG.POI",
        "nameZh": "兴趣地点",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.POI",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5D7092",
        "typeId": "2021042001647739",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021062202192857",
      "label": "应用服务类目",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 474,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021062202192857",
        "myDraft": true,
        "name": "MKG.ServiceCategory",
        "nameZh": "应用服务类目",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.ServiceCategory",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#E86452",
        "typeId": "2021062202192857",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021061502070640",
      "label": "淘宝商品",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 0,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021061502070640",
        "myDraft": true,
        "name": "MKG.TaobaoItem",
        "nameZh": "淘宝商品",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.TaobaoItem",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5B8FF9",
        "typeId": "2021061502070640",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "706000077",
      "label": "省",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 304000010,
        "dataCount": 34,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": true,
        "iCopyEdge": false,
        "id": "706000077",
        "myDraft": true,
        "name": "Province",
        "nameZh": "省",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [
          {
            "desc": "省级行政区链指算子",
            "iGood": 0,
            "id": 19000025,
            "jarAddress": "",
            "lang": "",
            "mainClass": "",
            "name": "province-link-operator",
            "overviewId": 0,
            "params": "",
            "script": "",
            "transformerEnumCode": "ENTITY_LINK",
            "url": "https://akg.alipay.com/v2/knowledgeBuild/operator/detail?algorithmOverviewId=23000035&operatorId=19000025",
            "version": 1
          }
        ],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "Province",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5B8FF9",
        "typeId": "706000077",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "706000078",
      "label": "市",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 304000010,
        "dataCount": 362,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": true,
        "iCopyEdge": false,
        "id": "706000078",
        "myDraft": true,
        "name": "City",
        "nameZh": "市",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [
          {
            "desc": "城市链指算子",
            "iGood": 0,
            "id": 19000033,
            "jarAddress": "",
            "lang": "",
            "mainClass": "",
            "name": "city-link-operator",
            "overviewId": 0,
            "params": "",
            "script": "",
            "transformerEnumCode": "ENTITY_LINK",
            "url": "https://akg.alipay.com/v2/knowledgeBuild/operator/detail?algorithmOverviewId=23000039&operatorId=19000033",
            "version": 1
          }
        ],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "City",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#F6BD16",
        "typeId": "706000078",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "706000076",
      "label": "区县",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 304000010,
        "dataCount": 3140,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": true,
        "iCopyEdge": false,
        "id": "706000076",
        "myDraft": true,
        "name": "District",
        "nameZh": "区县",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [
          {
            "desc": "区县行政区链指算子",
            "iGood": 0,
            "id": 19000035,
            "jarAddress": "",
            "lang": "",
            "mainClass": "",
            "name": "district-link-operator",
            "overviewId": 0,
            "params": "",
            "script": "",
            "transformerEnumCode": "ENTITY_LINK",
            "url": "https://akg.alipay.com/v2/knowledgeBuild/operator/detail?algorithmOverviewId=23000041&operatorId=19000035",
            "version": 1
          }
        ],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "District",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5D7092",
        "typeId": "706000076",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021071403192966",
      "label": "品类",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 19892,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021071403192966",
        "myDraft": true,
        "name": "MKG.ProductCategory",
        "nameZh": "品类",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.ProductCategory",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5D7092",
        "typeId": "2021071403192966",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021112205696328",
      "label": "自然人",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 921776978,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021112205696328",
        "myDraft": true,
        "name": "MKG.Person",
        "nameZh": "自然人",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.Person",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#6DC8EC",
        "typeId": "2021112205696328",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021070802876233",
      "label": "电影类型",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 69,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021070802876233",
        "myDraft": true,
        "name": "MKG.FilmType",
        "nameZh": "电影类型",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.FilmType",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#1E9493",
        "typeId": "2021070802876233",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647754",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021052601883401",
      "label": "用户",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 951741873,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021052601883401",
        "myDraft": true,
        "name": "MKG.User",
        "nameZh": "用户",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.User",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#76523B",
        "typeId": "2021052601883401",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021102005411227",
      "label": "对象概念",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 335000009,
        "dataCount": 66489,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021102005411227",
        "myDraft": true,
        "name": "CKG.Object",
        "nameZh": "对象概念",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "CKG.Object",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#945FB9",
        "typeId": "2021102005411227",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021102005411229",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "706000075",
      "label": "行政区域",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 304000010,
        "dataCount": 1,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "706000075",
        "myDraft": true,
        "name": "AdministractiveArea",
        "nameZh": "行政区域",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "AdministractiveArea",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#FF9845",
        "typeId": "706000075",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-706000074",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021052601883395",
      "label": "物品",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 0,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021052601883395",
        "myDraft": true,
        "name": "MKG.Item",
        "nameZh": "物品",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.Item",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#F6BD16",
        "typeId": "2021052601883395",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647754",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021070602724516",
      "label": "电影",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 941924,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021070602724516",
        "myDraft": true,
        "name": "MKG.Film",
        "nameZh": "电影",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.Film",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5B8FF9",
        "typeId": "2021070602724516",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021051301783084",
      "label": "直连商户",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 386098230,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021051301783084",
        "myDraft": true,
        "name": "MKG.DirectMerchant",
        "nameZh": "直连商户",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.DirectMerchant",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5AD8A6",
        "typeId": "2021051301783084",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647734",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021052601883399",
      "label": "场景",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 0,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021052601883399",
        "myDraft": true,
        "name": "MKG.Scene",
        "nameZh": "场景",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.Scene",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#6DC8EC",
        "typeId": "2021052601883399",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647754",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021053101941872",
      "label": "饿了么门店",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 2884298,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021053101941872",
        "myDraft": true,
        "name": "MKG.EleShop",
        "nameZh": "饿了么门店",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.EleShop",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#945FB9",
        "typeId": "2021053101941872",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647749",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021053101941854",
      "label": "消费券",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 2072786,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021053101941854",
        "myDraft": true,
        "name": "MKG.Benefit",
        "nameZh": "消费券",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.Benefit",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#F6BD16",
        "typeId": "2021053101941854",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021051801807030",
      "label": "行业类目",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 239,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021051801807030",
        "myDraft": true,
        "name": "MKG.MCC2",
        "nameZh": "行业类目",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.MCC2",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5AD8A6",
        "typeId": "2021051801807030",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647754",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021053101941873",
      "label": "飞猪门店",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 922861,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021053101941873",
        "myDraft": true,
        "name": "MKG.FliggyShop",
        "nameZh": "飞猪门店",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.FliggyShop",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#E86452",
        "typeId": "2021053101941873",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647749",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021053101936949",
      "label": "蚂蚁门店",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 114566354,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021053101936949",
        "myDraft": true,
        "name": "MKG.MifShop",
        "nameZh": "蚂蚁门店",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.MifShop",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#1E9493",
        "typeId": "2021053101936949",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021042001647749",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    },
    {
      "id": "2021071603289465",
      "label": "WiFi",
      "type": "BaseNode",
      "data": {
        "ableEdit": false,
        "belongToProject": 317000082,
        "dataCount": 470057729,
        "deepInherit": false,
        "description": "",
        "descriptionZh": "",
        "fuseConfig": null,
        "hasLinkOperator": false,
        "iCopyEdge": false,
        "id": "2021071603289465",
        "myDraft": true,
        "name": "MKG.WiFi",
        "nameZh": "WiFi",
        "operation": "",
        "priority": "",
        "projectIds": [],
        "propertyCount": 0,
        "scope": "PRIVATE",
        "status": 0,
        "subTypeCount": 0,
        "transformerDetailList": [],
        "unableEditReason": "",
        "fixed": true
      },
      "disabled": false,
      "accessible": true,
      "custom": {
        "desc": "",
        "typeName": "MKG.WiFi",
        "coreNode": false,
        "virtual": false,
        "icon": "",
        "labels": [],
        "colorType": "#5AD8A6",
        "typeId": "2021071603289465",
        "operation": "",
        "isConceptNode": false,
        "isMetaConceptNode": false
      },
      "comboId": "combo-2021071603289464",
      "zoomLevel": 3,
      "anchorPoints": [],
      "isAdded": false
    }
  ],
  "edges": [
    {
      "id": "2021071403193210",
      "source": "2021042101657968",
      "target": "2021071403192966",
      "label": "所属类目",
      "data": {
        "belongToProject": 0,
        "dataCount": 1248145,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021071403193210,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042101657968",
        "target": "2021071403192966",
        "type": "hasCategory",
        "typeZh": "所属类目"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasCategory",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Product_hasCategory_MKG.ProductCategory",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "所属类目",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "所属类目",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021090904840437",
      "source": "2021042001647738",
      "target": "2021042101657968",
      "label": "账单产品",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021090904840437,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647738",
        "target": "2021042101657968",
        "type": "hasBillProduct",
        "typeZh": "账单产品"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasBillProduct",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.PartnerID_hasBillProduct_MKG.Product",
        "icon": "",
        "colorType": "#5B8FF9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "账单产品",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "账单产品",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#bbd4ff",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#bbd4ff"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#4680e8",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#4680e8"
          },
          "shadowColor": "#4680e8",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(187, 212, 255, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(187, 212, 255, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 2,
      "isAdded": false
    },
    {
      "id": "2021060101943960",
      "source": "2021042001647738",
      "target": "2021042001647739",
      "label": "关联POI",
      "data": {
        "belongToProject": 0,
        "dataCount": 54374330,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021060101943960,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647738",
        "target": "2021042001647739",
        "type": "relatedPOI",
        "typeZh": "关联POI"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "relatedPOI",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.PartnerID_relatedPOI_MKG.POI",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "关联POI",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "关联POI",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021072803815072",
      "source": "2021042001647738",
      "target": "2021042101657968",
      "label": "经营产品",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021072803815072,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647738",
        "target": "2021042101657968",
        "type": "hasProduct",
        "typeZh": "经营产品"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasProduct",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.PartnerID_hasProduct_MKG.Product",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "经营产品",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "经营产品",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 1,
      "isAdded": false
    },
    {
      "id": "2021071903461376",
      "source": "2021042001647738",
      "target": "2021052601883401",
      "label": "同ID",
      "data": {
        "belongToProject": 0,
        "dataCount": 398565726,
        "direction": "BOTH",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021071903461376,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647738",
        "target": "2021052601883401",
        "type": "sameID",
        "typeZh": "同ID"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "sameID",
        "virtual": false,
        "direction": "BOTH",
        "spoLabel": "MKG.PartnerID_sameID_MKG.User",
        "icon": "",
        "colorType": "#945FB9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "同ID",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "同ID",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#dbb3f3",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#dbb3f3"
        },
        "startArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#dbb3f3"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#a46eca",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "startArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#a46eca",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "startArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#8450a9",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#8450a9"
          },
          "startArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#8450a9"
          },
          "shadowColor": "#8450a9",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(219, 179, 243, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(219, 179, 243, 0.2)"
          },
          "startArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(219, 179, 243, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 1,
      "isAdded": false
    },
    {
      "id": "combo-2021081904549515",
      "source": "combo-2021042001647754",
      "target": "combo-2021042001647754",
      "label": "继承",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021081904549515,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647754",
        "target": "2021042001647754",
        "type": "isA",
        "typeZh": "继承"
      },
      "type": "LoopEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "isA",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Terminology_isA_MKG.Terminology",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "继承",
      "loopCfg": {
        "position": "top",
        "dist": 25
      },
      "fitviewLabel": "继承",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021121405955339",
      "source": "2021042001647722",
      "target": "2021042001647722",
      "label": "继承",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021121405955339,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647722",
        "target": "2021042001647722",
        "type": "isA",
        "typeZh": "继承"
      },
      "type": "LoopEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "isA",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Brand_isA_MKG.Brand",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "继承",
      "loopCfg": {
        "position": "top",
        "dist": 25
      },
      "fitviewLabel": "继承",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021051801818435",
      "source": "2021042001647722",
      "target": "2021042001647722",
      "label": "子品牌",
      "data": {
        "belongToProject": 0,
        "dataCount": 2,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021051801818435,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647722",
        "target": "2021042001647722",
        "type": "hasSubBrand",
        "typeZh": "子品牌"
      },
      "type": "LoopEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasSubBrand",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Brand_hasSubBrand_MKG.Brand",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "子品牌",
      "loopCfg": {
        "position": "top",
        "dist": 50
      },
      "fitviewLabel": "子品牌",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021052601883525",
      "source": "2021042001647721",
      "target": "706000077",
      "label": "位于",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021052601883525,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647721",
        "target": "706000077",
        "type": "locatedAt",
        "typeZh": "位于"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "locatedAt",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.AOI_locatedAt_Province",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "位于",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "位于",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021052601883524",
      "source": "2021042001647721",
      "target": "706000076",
      "label": "位于",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021052601883524,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647721",
        "target": "706000076",
        "type": "locatedAt",
        "typeZh": "位于"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "locatedAt",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.AOI_locatedAt_District",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "位于",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "位于",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021052601883526",
      "source": "2021042001647721",
      "target": "706000078",
      "label": "位于",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021052601883526,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647721",
        "target": "706000078",
        "type": "locatedAt",
        "typeZh": "位于"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "locatedAt",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.AOI_locatedAt_City",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "位于",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "位于",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021062202193071",
      "source": "2021062202192858",
      "target": "2021062202192858",
      "label": "上下位",
      "data": {
        "belongToProject": 0,
        "dataCount": 659,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021062202193071,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021062202192858",
        "target": "2021062202192858",
        "type": "isA",
        "typeZh": "上下位"
      },
      "type": "LoopEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "isA",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.ShopCategory_isA_MKG.ShopCategory",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "上下位",
      "loopCfg": {
        "position": "top",
        "dist": 25
      },
      "fitviewLabel": "上下位",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021052601883532",
      "source": "2021042001647739",
      "target": "706000078",
      "label": "位于",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021052601883532,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647739",
        "target": "706000078",
        "type": "locatedAt",
        "typeZh": "位于"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "locatedAt",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.POI_locatedAt_City",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "位于",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "位于",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021042101658010",
      "source": "2021042001647739",
      "target": "2021042001647721",
      "label": "位于",
      "data": {
        "belongToProject": 0,
        "dataCount": 47519797,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021042101658010,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647739",
        "target": "2021042001647721",
        "type": "locatedAt",
        "typeZh": "位于"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "locatedAt",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.POI_locatedAt_MKG.AOI",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "位于",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "位于",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021052601883531",
      "source": "2021042001647739",
      "target": "706000077",
      "label": "位于",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021052601883531,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647739",
        "target": "706000077",
        "type": "locatedAt",
        "typeZh": "位于"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "locatedAt",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.POI_locatedAt_Province",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "位于",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "位于",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021052601883530",
      "source": "2021042001647739",
      "target": "706000076",
      "label": "位于",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021052601883530,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647739",
        "target": "706000076",
        "type": "locatedAt",
        "typeZh": "位于"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "locatedAt",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.POI_locatedAt_District",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "位于",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "位于",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021062202193070",
      "source": "2021062202192857",
      "target": "2021062202192857",
      "label": "上下位",
      "data": {
        "belongToProject": 0,
        "dataCount": 478,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021062202193070,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021062202192857",
        "target": "2021062202192857",
        "type": "isA",
        "typeZh": "上下位"
      },
      "type": "LoopEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "isA",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.ServiceCategory_isA_MKG.ServiceCategory",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "上下位",
      "loopCfg": {
        "position": "top",
        "dist": 25
      },
      "fitviewLabel": "上下位",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021042001647762",
      "source": "combo-2021042001647749",
      "target": "2021042001647738",
      "label": "拥有支付码",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021042001647762,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647749",
        "target": "2021042001647738",
        "type": "hasPID",
        "typeZh": "拥有支付码"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasPID",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Shop_hasPID_MKG.PartnerID",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "拥有支付码",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "拥有支付码",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021090204762442",
      "source": "combo-2021042001647749",
      "target": "2021042001647721",
      "label": "附近AOI",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021090204762442,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647749",
        "target": "2021042001647721",
        "type": "nearbyAOI",
        "typeZh": "附近AOI"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "nearbyAOI",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Shop_nearbyAOI_MKG.AOI",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "附近AOI",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "附近AOI",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021042101658127",
      "source": "combo-2021042001647749",
      "target": "2021042001647722",
      "label": "所属品牌",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021042101658127,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647749",
        "target": "2021042001647722",
        "type": "hasBrand",
        "typeZh": "所属品牌"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasBrand",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Shop_hasBrand_MKG.Brand",
        "icon": "",
        "colorType": "#945FB9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "所属品牌",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "所属品牌",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#dbb3f3",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#dbb3f3"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#a46eca",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#a46eca",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#8450a9",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#8450a9"
          },
          "shadowColor": "#8450a9",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(219, 179, 243, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(219, 179, 243, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021042001647768",
      "source": "combo-2021042001647749",
      "target": "2021042001647739",
      "label": "关联POI",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021042001647768,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647749",
        "target": "2021042001647739",
        "type": "relatedPOI",
        "typeZh": "关联POI"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "relatedPOI",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Shop_relatedPOI_MKG.POI",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "关联POI",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "关联POI",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021071403175574",
      "source": "combo-2021042001647749",
      "target": "2021042101657968",
      "label": "账单产品",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021071403175574,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647749",
        "target": "2021042101657968",
        "type": "hasBillProduct",
        "typeZh": "账单产品"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasBillProduct",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Shop_hasBillProduct_MKG.Product",
        "icon": "",
        "colorType": "#5B8FF9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "账单产品",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "账单产品",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#bbd4ff",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#bbd4ff"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#4680e8",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#4680e8"
          },
          "shadowColor": "#4680e8",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(187, 212, 255, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(187, 212, 255, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021062202193069",
      "source": "combo-2021042001647749",
      "target": "2021062202192858",
      "label": "所属类目",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021062202193069,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647749",
        "target": "2021062202192858",
        "type": "hasCategory",
        "typeZh": "所属类目"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasCategory",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Shop_hasCategory_MKG.ShopCategory",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "所属类目",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "所属类目",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "310004620",
      "source": "706000077",
      "target": "706000078",
      "label": "省会",
      "data": {
        "belongToProject": 0,
        "dataCount": 28,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 310004620,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "706000077",
        "target": "706000078",
        "type": "chiefCityInProvince",
        "typeZh": "省会"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "chiefCityInProvince",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "Province_chiefCityInProvince_City",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "省会",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "省会",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 2,
      "isAdded": false
    },
    {
      "id": "310001766",
      "source": "706000077",
      "target": "706000078",
      "label": "包括",
      "data": {
        "belongToProject": 0,
        "dataCount": 362,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 310001766,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "706000077",
        "target": "706000078",
        "type": "include",
        "typeZh": "包括"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "include",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "Province_include_City",
        "icon": "",
        "colorType": "#5B8FF9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "包括",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "包括",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#bbd4ff",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#bbd4ff"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#4680e8",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#4680e8"
          },
          "shadowColor": "#4680e8",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(187, 212, 255, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(187, 212, 255, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 1,
      "isAdded": false
    },
    {
      "id": "310004629",
      "source": "706000077",
      "target": "707000062",
      "label": "属于国家",
      "data": {
        "belongToProject": 0,
        "dataCount": 34,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 310004629,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "706000077",
        "target": "707000062",
        "type": "belongToCountry",
        "typeZh": "属于国家"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "belongToCountry",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "Province_belongToCountry_Country",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "属于国家",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "属于国家",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "310001763",
      "source": "706000078",
      "target": "706000077",
      "label": "属于",
      "data": {
        "belongToProject": 0,
        "dataCount": 362,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 310001763,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "706000078",
        "target": "706000077",
        "type": "belongto",
        "typeZh": "属于"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "belongto",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "City_belongto_Province",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "属于",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "属于",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 1,
      "isAdded": false
    },
    {
      "id": "310001764",
      "source": "706000078",
      "target": "706000076",
      "label": "包括",
      "data": {
        "belongToProject": 0,
        "dataCount": 3140,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 310001764,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "706000078",
        "target": "706000076",
        "type": "include",
        "typeZh": "包括"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "include",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "City_include_District",
        "icon": "",
        "colorType": "#5B8FF9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "包括",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "包括",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#bbd4ff",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#bbd4ff"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#4680e8",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#4680e8"
          },
          "shadowColor": "#4680e8",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(187, 212, 255, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(187, 212, 255, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 1,
      "isAdded": false
    },
    {
      "id": "310001765",
      "source": "706000076",
      "target": "706000078",
      "label": "属于",
      "data": {
        "belongToProject": 0,
        "dataCount": 3170,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 310001765,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "706000076",
        "target": "706000078",
        "type": "belongto",
        "typeZh": "属于"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "belongto",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "District_belongto_City",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "属于",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "属于",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 1,
      "isAdded": false
    },
    {
      "id": "2021071403193211",
      "source": "2021071403192966",
      "target": "2021071403192966",
      "label": "上下位",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021071403193211,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021071403192966",
        "target": "2021071403192966",
        "type": "isA",
        "typeZh": "上下位"
      },
      "type": "LoopEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "isA",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.ProductCategory_isA_MKG.ProductCategory",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "上下位",
      "loopCfg": {
        "position": "top",
        "dist": 25
      },
      "fitviewLabel": "上下位",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021071503245934",
      "source": "2021052601883401",
      "target": "2021070602724516",
      "label": "购买电影票",
      "data": {
        "belongToProject": 0,
        "dataCount": 7263633,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021071503245934,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021052601883401",
        "target": "2021070602724516",
        "type": "buyMovieTicket",
        "typeZh": "购买电影票"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "buyMovieTicket",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.User_buyMovieTicket_MKG.Film",
        "icon": "",
        "colorType": "#5B8FF9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "购买电影票",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "购买电影票",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#bbd4ff",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#bbd4ff"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#4680e8",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#4680e8"
          },
          "shadowColor": "#4680e8",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(187, 212, 255, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(187, 212, 255, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021112205696683",
      "source": "2021052601883401",
      "target": "2021112205696328",
      "label": "同人",
      "data": {
        "belongToProject": 0,
        "dataCount": 850927359,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021112205696683,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021052601883401",
        "target": "2021112205696328",
        "type": "isThePerson",
        "typeZh": "同人"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "isThePerson",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.User_isThePerson_MKG.Person",
        "icon": "",
        "colorType": "#5B8FF9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "同人",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "同人",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#bbd4ff",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#bbd4ff"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#4680e8",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#4680e8"
          },
          "shadowColor": "#4680e8",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(187, 212, 255, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(187, 212, 255, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021060201953754",
      "source": "2021052601883401",
      "target": "2021053101941854",
      "label": "点击",
      "data": {
        "belongToProject": 0,
        "dataCount": 260424402,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021060201953754,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021052601883401",
        "target": "2021053101941854",
        "type": "click",
        "typeZh": "点击"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "click",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.User_click_MKG.Benefit",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "点击",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "点击",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 2,
      "isAdded": false
    },
    {
      "id": "2021072003521632",
      "source": "2021052601883401",
      "target": "2021052601883401",
      "label": "同事",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "BOTH",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021072003521632,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021052601883401",
        "target": "2021052601883401",
        "type": "workmate",
        "typeZh": "同事"
      },
      "type": "LoopEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "workmate",
        "virtual": false,
        "direction": "BOTH",
        "spoLabel": "MKG.User_workmate_MKG.User",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "同事",
      "loopCfg": {
        "position": "top",
        "dist": 25
      },
      "fitviewLabel": "同事",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        },
        "startArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "startArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "startArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "startArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "startArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021061502070813",
      "source": "2021052601883401",
      "target": "2021061502070640",
      "label": "消费",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021061502070813,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021052601883401",
        "target": "2021061502070640",
        "type": "consume",
        "typeZh": "消费"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "consume",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.User_consume_MKG.TaobaoItem",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "消费",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "消费",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021060201953768",
      "source": "2021052601883401",
      "target": "2021042001647738",
      "label": "消费",
      "data": {
        "belongToProject": 0,
        "dataCount": 12530701969,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021060201953768,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021052601883401",
        "target": "2021042001647738",
        "type": "consume",
        "typeZh": "消费"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "consume",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.User_consume_MKG.PartnerID",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "消费",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "消费",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 1,
      "isAdded": false
    },
    {
      "id": "2021060201954721",
      "source": "2021052601883401",
      "target": "2021042101657968",
      "label": "消费",
      "data": {
        "belongToProject": 0,
        "dataCount": 5848965248,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021060201954721,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021052601883401",
        "target": "2021042101657968",
        "type": "consume",
        "typeZh": "消费"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "consume",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.User_consume_MKG.Product",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "消费",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "消费",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021072003521630",
      "source": "2021052601883401",
      "target": "2021052601883401",
      "label": "夫妻",
      "data": {
        "belongToProject": 0,
        "dataCount": 321419640,
        "direction": "BOTH",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021072003521630,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021052601883401",
        "target": "2021052601883401",
        "type": "couple",
        "typeZh": "夫妻"
      },
      "type": "LoopEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "couple",
        "virtual": false,
        "direction": "BOTH",
        "spoLabel": "MKG.User_couple_MKG.User",
        "icon": "",
        "colorType": "#5B8FF9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "夫妻",
      "loopCfg": {
        "position": "top",
        "dist": 50
      },
      "fitviewLabel": "夫妻",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#bbd4ff",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#bbd4ff"
        },
        "startArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#bbd4ff"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "startArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "startArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#4680e8",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#4680e8"
          },
          "startArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#4680e8"
          },
          "shadowColor": "#4680e8",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(187, 212, 255, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(187, 212, 255, 0.2)"
          },
          "startArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(187, 212, 255, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021060201953766",
      "source": "2021052601883401",
      "target": "2021042001647722",
      "label": "消费",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021060201953766,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021052601883401",
        "target": "2021042001647722",
        "type": "consume",
        "typeZh": "消费"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "consume",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.User_consume_MKG.Brand",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "消费",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "消费",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021060201953786",
      "source": "2021052601883401",
      "target": "2021053101941854",
      "label": "核销",
      "data": {
        "belongToProject": 0,
        "dataCount": 8020408,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021060201953786,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021052601883401",
        "target": "2021053101941854",
        "type": "use",
        "typeZh": "核销"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "use",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.User_use_MKG.Benefit",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "核销",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "核销",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 1,
      "isAdded": false
    },
    {
      "id": "combo-2021070102460191",
      "source": "2021052601883401",
      "target": "combo-2021042001647749",
      "label": "从支付码消费",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021070102460191,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021052601883401",
        "target": "2021042001647749",
        "type": "consumeFromPID",
        "typeZh": "从支付码消费"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "consumeFromPID",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.User_consumeFromPID_MKG.Shop",
        "icon": "",
        "colorType": "#945FB9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "从支付码消费",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "从支付码消费",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#dbb3f3",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#dbb3f3"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#a46eca",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#a46eca",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#8450a9",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#8450a9"
          },
          "shadowColor": "#8450a9",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(219, 179, 243, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(219, 179, 243, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021070602724757",
      "source": "2021070602724516",
      "target": "2021070602724529",
      "label": "电影导演",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021070602724757,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021070602724516",
        "target": "2021070602724529",
        "type": "filmDirector",
        "typeZh": "电影导演"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "filmDirector",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Film_filmDirector_MKG.FilmPerson",
        "icon": "",
        "colorType": "#5B8FF9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "电影导演",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "电影导演",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#bbd4ff",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#bbd4ff"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#4680e8",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#4680e8"
          },
          "shadowColor": "#4680e8",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(187, 212, 255, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(187, 212, 255, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 2,
      "isAdded": false
    },
    {
      "id": "2021070602724755",
      "source": "2021070602724516",
      "target": "2021070602724529",
      "label": "电影演员",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021070602724755,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021070602724516",
        "target": "2021070602724529",
        "type": "filmActor",
        "typeZh": "电影演员"
      },
      "type": "custom-quadratic",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "filmActor",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Film_filmActor_MKG.FilmPerson",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "电影演员",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "电影演员",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": 10,
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "curveLevel": 1,
      "isAdded": false
    },
    {
      "id": "2021123006094859",
      "source": "2021053101941854",
      "target": "2021071403192966",
      "label": "券品类",
      "data": {
        "belongToProject": 0,
        "dataCount": 37404,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021123006094859,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021053101941854",
        "target": "2021071403192966",
        "type": "hasBenefitGoods",
        "typeZh": "券品类"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasBenefitGoods",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Benefit_hasBenefitGoods_MKG.ProductCategory",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "券品类",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "券品类",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "2021123006094858",
      "source": "2021053101941854",
      "target": "2021042001647722",
      "label": "券品牌",
      "data": {
        "belongToProject": 0,
        "dataCount": 65230,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021123006094858,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021053101941854",
        "target": "2021042001647722",
        "type": "hasBenefitBrand",
        "typeZh": "券品牌"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasBenefitBrand",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Benefit_hasBenefitBrand_MKG.Brand",
        "icon": "",
        "colorType": "#5B8FF9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "券品牌",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "券品牌",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#bbd4ff",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#bbd4ff"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#4680e8",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#4680e8"
          },
          "shadowColor": "#4680e8",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(187, 212, 255, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(187, 212, 255, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021042101658126",
      "source": "combo-2021042001647734",
      "target": "2021042001647722",
      "label": "所属品牌",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021042101658126,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647734",
        "target": "2021042001647722",
        "type": "hasBrand",
        "typeZh": "所属品牌"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasBrand",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Merchant_hasBrand_MKG.Brand",
        "icon": "",
        "colorType": "#945FB9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "所属品牌",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "所属品牌",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#dbb3f3",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#dbb3f3"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#a46eca",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#a46eca",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#8450a9",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#8450a9"
          },
          "shadowColor": "#8450a9",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(219, 179, 243, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(219, 179, 243, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021042001647767",
      "source": "combo-2021042001647734",
      "target": "2021042001647739",
      "label": "关联POI",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021042001647767,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647734",
        "target": "2021042001647739",
        "type": "relatedPOI",
        "typeZh": "关联POI"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "relatedPOI",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Merchant_relatedPOI_MKG.POI",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "关联POI",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "关联POI",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021052601883515",
      "source": "combo-2021042001647734",
      "target": "2021042001647738",
      "label": "关联pid",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021052601883515,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647734",
        "target": "2021042001647738",
        "type": "hasPID",
        "typeZh": "关联pid"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasPID",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Merchant_hasPID_MKG.PartnerID",
        "icon": "",
        "colorType": "#FF9845",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "关联pid",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "关联pid",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#ffdba2",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#ffdba2"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#ffa955",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#ffa955"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#ec8835",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#ec8835"
          },
          "shadowColor": "#ec8835",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(255, 219, 162, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(255, 219, 162, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021071403175572",
      "source": "combo-2021042001647734",
      "target": "2021042101657968",
      "label": "账单产品",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021071403175572,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647734",
        "target": "2021042101657968",
        "type": "hasBillProduct",
        "typeZh": "账单产品"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasBillProduct",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Merchant_hasBillProduct_MKG.Product",
        "icon": "",
        "colorType": "#5B8FF9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "账单产品",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "账单产品",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#bbd4ff",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#bbd4ff"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#709ffb",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#709ffb"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#4680e8",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#4680e8"
          },
          "shadowColor": "#4680e8",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(187, 212, 255, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(187, 212, 255, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021042101658130",
      "source": "combo-2021042001647734",
      "target": "combo-2021042001647749",
      "label": "拥有门店",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021042101658130,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647734",
        "target": "2021042001647749",
        "type": "hasShop",
        "typeZh": "拥有门店"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasShop",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Merchant_hasShop_MKG.Shop",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "拥有门店",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "拥有门店",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021042001647769",
      "source": "combo-2021042001647740",
      "target": "combo-2021042001647749",
      "label": "相关门店",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021042001647769,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647740",
        "target": "2021042001647749",
        "type": "relatedShop",
        "typeZh": "相关门店"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "relatedShop",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Service_relatedShop_MKG.Shop",
        "icon": "",
        "colorType": "#945FB9",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "相关门店",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "相关门店",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#dbb3f3",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#dbb3f3"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#a46eca",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#a46eca",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#a46eca"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#8450a9",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#8450a9"
          },
          "shadowColor": "#8450a9",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(219, 179, 243, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(219, 179, 243, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    },
    {
      "id": "combo-2021062202193068",
      "source": "combo-2021042001647740",
      "target": "2021062202192857",
      "label": "所属类目",
      "data": {
        "belongToProject": 0,
        "dataCount": 0,
        "direction": "SINGLE",
        "extension": null,
        "iCopyRelationToDest": false,
        "iFuseEdge": false,
        "iHidden": false,
        "id": 2021062202193068,
        "logKey": "",
        "operation": "",
        "relationSource": 0,
        "source": "2021042001647740",
        "target": "2021062202192857",
        "type": "hasCategory",
        "typeZh": "所属类目"
      },
      "type": "VectorEdge",
      "disabled": false,
      "accessible": true,
      "isConcept": false,
      "custom": {
        "typeName": "hasCategory",
        "virtual": false,
        "direction": "SINGLE",
        "spoLabel": "MKG.Service_hasCategory_MKG.ServiceCategory",
        "icon": "",
        "colorType": "#1E9493",
        "operation": "",
        "isConceptSource": false,
        "isConceptTarget": false
      },
      "_label": "所属类目",
      "loopCfg": {
        "position": "top",
        "dist": 20
      },
      "fitviewLabel": "所属类目",
      "showLabel": true,
      "shape": "VectorEdge",
      "labelCfg": {
        "fontSize": 10,
        "position": "center",
        "refX": "0",
        "refY": "0",
        "autoRotate": true,
        "style": {
          "fontSize": 10,
          "fill": "rgba(0,0,0,0.65)",
          "fontWeight": 100,
          "fillOpacity": 1,
          "backgroundColor": "#fff",
          "backgroundPadding": 4,
          "lineWidth": 3
        }
      },
      "style": {
        "lineWidth": 1,
        "lineDash": [],
        "stroke": "#99d9d7",
        "shadowBlur": 0,
        "endArrow": {
          "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
          "d": 0,
          "lineWidth": 2,
          "lineDash": [],
          "fill": "#99d9d7"
        }
      },
      "stateStyles": {
        "active": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "text-shape": {
            "fontWeight": 500
          }
        },
        "highlight": {
          "lineWidth": 4,
          "lineDash": [],
          "stroke": "#36a4a3",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 8,0 L 17,-4.5 L 17,4.5 Z",
            "d": 4,
            "lineWidth": 4,
            "lineDash": [],
            "fill": "#36a4a3"
          },
          "labelCfg": {
            "style": {
              "fontWeight": 500,
              "fontSize": 14
            }
          },
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "selected": {
          "lineWidth": 2,
          "lineDash": [],
          "stroke": "#158483",
          "shadowBlur": 10,
          "endArrow": {
            "path": "M 0,0 L 7,-3.5 L 7,3.5 Z",
            "d": 0,
            "lineWidth": 2,
            "lineDash": [],
            "fill": "#158483"
          },
          "shadowColor": "#158483",
          "text-shape": {
            "fontWeight": 500,
            "fill": "rgba(0, 0, 0, 0.85)"
          }
        },
        "inactive": {
          "lineWidth": 1,
          "lineDash": [],
          "stroke": "rgba(153, 217, 215, 0.2)",
          "shadowBlur": 0,
          "endArrow": {
            "path": "M 0,0 L 6,-3 L 6,3 Z",
            "d": 0,
            "lineWidth": 1,
            "lineDash": [],
            "fill": "rgba(153, 217, 215, 0.2)"
          },
          "labelCfg": {
            "style": {
              "fillOpacity": 0.1
            }
          }
        }
      },
      "isAdded": false
    }
  ],
  "combos": [
    {
      "id": "combo-706000074",
      "label": "地点"
    },
    {
      "id": "combo-2021102005411229",
      "label": "2021102005411229"
    },
    {
      "id": "combo-2021071603289464",
      "label": "介质"
    },
    {
      "id": "combo-2021061602092722",
      "label": "支付事件"
    },
    {
      "id": "combo-2021042001647749",
      "label": "门店"
    },
    {
      "id": "combo-2021042001647740",
      "label": "服务"
    },
    {
      "id": "combo-2021042001647734",
      "label": "商户"
    },
    {
      "id": "combo-2021042001647754",
      "label": "标准领域术语"
    }
  ]
}

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

describe('no node and one node', () => {
  it('layout without node', (done) => {
    const testData = {};
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboCombined',
      },
      width: 500,
      height: 500,
    });
    graph.data(testData);
    graph.render();
    graph.destroy();
    done();
  });
  it('layout with one node', (done) => {
    const testData = {
      nodes: [
        {
          id: 'node',
          x: 0,
          y: 0,
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboCombined',
      },
      width: 500,
      height: 500,
    });
    graph.on('afterlayout', () => {
      expect(testData.nodes[0].x).toBe(250);
      expect(testData.nodes[0].y).toBe(250);
      done();
    });
    graph.data(testData);
    graph.render();
    graph.destroy();
  });
});

describe('scenario', () => {
  const scenarioData = {
    nodes: [...data.nodes],
    edges: [...data.edges],
    combos: [...data.combos]
  };
  // 模拟 combo 节点和其他部分的边
  const comboNodeEdges = [
    { source: 'a', target: '14' },
    { source: 'a', target: '16' },
    { source: '13', target: 'a' },
    { source: 'b', target: '18' },
    { source: 'b', target: '19' },
    { source: 'b', target: '4' },
    { source: 'c', target: '30' },
    { source: 'c', target: '13' },
    { source: '15', target: 'c' },
    { source: 'c', target: 'c' },
  ]
  const nodeMap = {};
  const oriItemComboMap = {};
  const oriComboItemMap = {};
  scenarioData.nodes.forEach(node => {
    nodeMap[node.id] = node;
    oriItemComboMap[node.id] = node.comboId;
    if (!oriComboItemMap[node.comboId]) oriComboItemMap[node.comboId] = []
    oriComboItemMap[node.comboId].push(node.id);
    // 移除 combo d
    // if (node.id === '32' || node.id === '31' || node.id === '33') delete node.comboId
  });
  scenarioData.combos.forEach((combo, i) => {
    oriItemComboMap[combo.id] = combo.parentId;
    if (!oriComboItemMap[combo.parentId]) oriComboItemMap[combo.parentId] = []
    oriComboItemMap[combo.parentId].push(combo.id);
    // 移除 combo d
    // if (combo.id === 'd') scenarioData.combos.splice(i, 1)
  })
  // 删除跨越 combo 的边，替代为 comboEdges（无论边数量、方向，均用一条虚线边代替）
  const comboEdgesMap = {};
  const removedEdges = [];
  for (let i = scenarioData.edges.length - 1; i >= 0; i--) {
    const edge = scenarioData.edges[i];
    delete edge.style;
    const sourceParentId = nodeMap[edge.source]?.comboId || nodeMap[edge.source]?.parentId;
    const targetParentId = nodeMap[edge.target]?.comboId || nodeMap[edge.target]?.parentId;
    if (sourceParentId !== targetParentId) {
      removedEdges.push(edge);
      scenarioData.edges.splice(i, 1);
      const key = edge.source < edge.target ? `${edge.source}-${edge.target}` : `${edge.target}-${edge.source}`;
      comboEdgesMap[key] = {
        source: sourceParentId,
        target: targetParentId,
        style: {
          lineDash: [5, 5]
        }
      }
    }
  }
  const comboEdges = Object.values(comboEdgesMap);
  scenarioData.edges = scenarioData.edges.concat(comboEdges);
  const graph = new G6.Graph({
    container: div,
    layout: {
      type: 'comboCombined',
      innerLayout: new ConcentricLayout({ sortBy: 'degree' })
    },
    width: 500,
    height: 500,
    defaultCombo: {
      padding: 1,
      style: {
        fillOpacity: 0.7
      },
      labelCfg: {
        style: {
          fill: '#fff'
        }
      }
    },
    modes: {
      default: ['drag-canvas', 'zoom-canvas', {
        type: 'drag-combo',
        onlyChangeComboSize: true
      }, {
          type: 'drag-node',
          onlyChangeComboSize: true
        }] // 'collapse-expand-combo', 
    },
    animate: true,
    animateCfg: { duration: 500, easing: 'easeCubic' },
    groupByTypes: false
  });
  graph.data(scenarioData);
  graph.render();
  // 点击 combo 时，uncombo，并加入一个代表被解散 combo 的节点，恢复相关的边（包括内部元素到其他 combo 的边，以及新节点相关的边(random)）
  graph.on('combo:click', e => {
    const combo = e.item;
    const comboChildren = combo.getChildren();
    const children = comboChildren.nodes.concat(comboChildren.combos);
    const newEdges = [];
    const comboId = combo.getID();

    // 代替 combo 的节点 id
    const comboNodeId = 'combo-node-' + comboId
    const comboBBox = { ...combo.getBBox() };
    // 增加代替 combo 的节点
    graph.addItem('node', {
      id: comboNodeId,
      label: combo.getModel().label,
      x: comboBBox.centerX,
      y: comboBBox.minY,
      comboId: combo.getModel().parentId
    });
    // 恢复该节点和其他元素的连接
    comboNodeEdges.forEach(cEdge => {
      const sourceModel = graph.findById(cEdge.source)?.getModel();
      const targetModel = graph.findById(cEdge.target)?.getModel();
      if (!sourceModel || !targetModel) return;
      newEdges.push(graph.addItem('edge', {
        source: cEdge.source === comboId ? comboNodeId : sourceModel.comboId || sourceModel.parentId || cEdge.source,
        target: cEdge.target === comboId ? comboNodeId : targetModel.comboId || targetModel.parentId || cEdge.target,
      }))
    });

    children.forEach((child, i) => {
      const childId = child.getID();
      // 恢复所有子节点与其他元素的连接
      removedEdges.forEach(rEdge => {
        const isSource = rEdge.source === childId;
        const otherEndItem = isSource ? graph.findById(rEdge.target) : graph.findById(rEdge.source);
        if (!otherEndItem) return;
        const otherEndModel = otherEndItem.getModel();
        const otherEndCurrentParent = otherEndModel.comboId || otherEndModel.parentId;
        newEdges.push(graph.addItem('edge', {
          source: isSource ? childId : otherEndCurrentParent || rEdge.source,
          target: isSource ? otherEndCurrentParent || rEdge.target : childId,
          style: otherEndCurrentParent ? {
            lineDash: [5, 5]
          } : {}
        }));
      });
    });

    console.log('====', graph.findById('test0'), graph.findById('test1'))

    // uncombo
    // 增加动画
    combo.getKeyShape().animate({ y: -comboBBox.height / 2, r: 10 }, { duration: 300, easing: 'easeCubic' });
    setTimeout(() => {
      graph.uncombo(combo.getID());
      graph.layout();
    }, 300);

    // 标记新增的边，用于观察
    console.log('newEdges.leng', newEdges.length);
    newEdges.forEach(nEdge => {
      if (nEdge.destroyed) return;
      graph.updateItem(nEdge, {
        style: {
          stroke: '#f00'
        }
      })
    })
  });
  // graph.on('combo:dragend', e => {
  //   const model = e.item.getModel()
  //   model.fx = model.x;
  //   model.fy = model.y;
  //   graph.layout();
  // })

  graph.on('node:click', e => {
    const nodeId = e.item.getID();
    const oriComboId = oriItemComboMap[nodeId]
    const meanCenter = { x: 0, y: 0, count: 0 };
    Object.keys(oriItemComboMap).forEach(nodeId => {
      if (oriItemComboMap[nodeId] === oriComboId) {
        const nodeModel = graph.findById(nodeId)?.getModel()
        if (nodeModel) {
          meanCenter.x += (nodeModel.x || 0);
          meanCenter.y += (nodeModel.y || 0);
          meanCenter.count++;
        }
      }
    });
    meanCenter.x /= meanCenter.count;
    meanCenter.y /= meanCenter.count;

    if (oriComboId && !e.item.getModel().comboId) {
      console.log('add combo', oriComboId);
      graph.addItem('combo', {
        id: oriComboId,
        label: oriComboId,
        x: meanCenter.x,
        y: meanCenter.y
      });
      const childIds = oriComboItemMap[oriComboId];
      childIds.forEach(childId => {
        console.log('update children', childId)
        const childItem = graph.findById(childId);
        if (!childItem) return;
        graph.updateComboTree(childId, oriComboId);
      })
      graph.removeItem('combo-node-' + oriComboId);
      const edgeItems = graph.getEdges();
      const virtualEdgeToBeAdded = {}
      for (let i = edgeItems.length - 1; i >= 0; i--) {
        graph.getEdges().forEach(edge => {
          const model = edge.getModel();
          const isRelated = childIds.includes(model.source) || childIds.includes(model.target);
          const sourceRelated = isRelated && childIds.includes(model.source);
          if (isRelated) {
            const key = model.source < model.target ? `${model.source}-${model.target}` : `${model.target}-${model.source}`;
            const sourceModel = graph.findById(model.source)?.getModel();
            const targetModel = graph.findById(model.target)?.getModel();
            if (!sourceModel || !targetModel) return;
            const sourceParentId = sourceModel.comboId || sourceModel.parentId;
            const targetParentId = targetModel.comboId || targetModel.parentId;
            if (sourceParentId === targetParentId) return;
            graph.removeItem(edge);
            virtualEdgeToBeAdded[key] = {
              source: sourceRelated ? oriComboId : sourceParentId || sourceModel.id,
              target: sourceRelated ? targetParentId || targetModel.id : oriComboId,
              style: {
                lineDash: [5, 5]
              }
            }
          }
        })
      }
      Object.values(virtualEdgeToBeAdded).map(edgeInfo => graph.addItem('edge', edgeInfo));
      setTimeout(() => {
        graph.layout();
      }, 300);
    }
  });

  it('senario', () => {
  });
});