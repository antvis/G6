export const testData = {
    "nodes": [
      {
        "id": "model-meta_store_View",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "视图 (View)",
          "fields": [
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_oldKey",
              "label": "0.4.x 版本的 Resource Key (oldKey)",
              "type": "Text",
              "originalKey": "oldKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_type",
              "label": "类型 (type)",
              "type": "Enum",
              "originalKey": "type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_viewCode_compiledControllerHash",
              "label": "编译后的 Controller 代码签名 (viewCode_compiledControllerHash)",
              "type": "Text",
              "originalKey": "viewCode_compiledControllerHash",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_model",
              "label": "所属模型 (model)",
              "type": "ToOne",
              "originalKey": "model",
              "isForeign": true,
              "relationModel": "模型"
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_viewCode_compiledControllerCode",
              "label": "编译后的 Controller 代码 (viewCode_compiledControllerCode)",
              "type": "RichText",
              "originalKey": "viewCode_compiledControllerCode",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_viewCode_controllerCode",
              "label": "Controller 代码 (viewCode_controllerCode)",
              "type": "RichText",
              "originalKey": "viewCode_controllerCode",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_activated",
              "label": "是否激活 (activated)",
              "type": "Boolean",
              "originalKey": "activated",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_authorization",
              "label": "authorization",
              "type": "Boolean",
              "originalKey": "authorization",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_viewCode_code",
              "label": "View 代码 (viewCode_code)",
              "type": "RichText",
              "originalKey": "viewCode_code",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDefault",
              "label": "是否默认默认视图 (isDefault)",
              "type": "Boolean",
              "originalKey": "isDefault",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_View",
          "name": "视图"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_FieldPermission",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "字段权限 (FieldPermission)",
          "fields": [
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_modelKey",
              "label": "模型名称 (modelKey)",
              "type": "Text",
              "originalKey": "modelKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_field",
              "label": "字段名称 (field)",
              "type": "Text",
              "originalKey": "field",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_FieldPermission",
          "name": "字段权限"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-base_OssDownloadModel",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "Oss 下载文件模型 (OssDownloadModel)",
          "fields": [
            {
              "key": "base_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "base_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_ossUrl",
              "label": "OSS 下载文件地址 (ossUrl)",
              "type": "Text",
              "originalKey": "ossUrl",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "base_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "base_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            }
          ],
          "key": "base_OssDownloadModel",
          "name": "Oss 下载文件模型"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-base_Company",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "公司 (Company)",
          "fields": [
            {
              "key": "base_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "base_language",
              "label": "语言 (language)",
              "type": "Dictionary",
              "originalKey": "language",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_parent",
              "label": "上级公司 (parent)",
              "type": "ToOne",
              "originalKey": "parent",
              "isForeign": true,
              "relationModel": "公司"
            },
            {
              "key": "base_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "base_shortName",
              "label": "公司简称 (shortName)",
              "type": "Text",
              "originalKey": "shortName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_code",
              "label": "公司编码 (code)",
              "type": "Text",
              "originalKey": "code",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_remark",
              "label": "公司详情 (remark)",
              "type": "RichText",
              "originalKey": "remark",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_outerCode",
              "label": "外部编码 (outerCode)",
              "type": "Text",
              "originalKey": "outerCode",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_currency",
              "label": "货币 (currency)",
              "type": "Dictionary",
              "originalKey": "currency",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_country",
              "label": "国家 (country)",
              "type": "Dictionary",
              "originalKey": "country",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_abbreviation",
              "label": "公司缩写 (abbreviation)",
              "type": "Text",
              "originalKey": "abbreviation",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_address",
              "label": "地址 (address)",
              "type": "Text",
              "originalKey": "address",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "base_name",
              "label": "公司名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_status",
              "label": "状态 (status)",
              "type": "Enum",
              "originalKey": "status",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            }
          ],
          "key": "base_Company",
          "name": "公司"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_ModelFieldGroup",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "模型字段组 (ModelFieldGroup)",
          "fields": [
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_activated",
              "label": "是否激活 (activated)",
              "type": "Boolean",
              "originalKey": "activated",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_type",
              "label": "类型 (type)",
              "type": "Enum",
              "originalKey": "type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_groupFields",
              "label": "包含字段 (groupFields)",
              "type": "Json",
              "originalKey": "groupFields",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_model",
              "label": "所属模型 (model)",
              "type": "ToOne",
              "originalKey": "model",
              "isForeign": true,
              "relationModel": "模型"
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_ModelFieldGroup",
          "name": "模型字段组"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_Widget",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "控件 (Widget)",
          "fields": [
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDefault",
              "label": "是否默认 (isDefault)",
              "type": "Boolean",
              "originalKey": "isDefault",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_content",
              "label": "内容 (content)",
              "type": "Json",
              "originalKey": "content",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_forModel",
              "label": "所属模型 (forModel)",
              "type": "ToOne",
              "originalKey": "forModel",
              "isForeign": true,
              "relationModel": "模型"
            },
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_Widget",
          "name": "控件"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-base_DynamicModel",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "动态模型 (DynamicModel)",
          "fields": [
            {
              "key": "base_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "base_data",
              "label": "动态模型内容 (data)",
              "type": "Json",
              "originalKey": "data",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "base_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            }
          ],
          "key": "base_DynamicModel",
          "name": "动态模型"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-event_store_ModelChangedEvent",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "模型变更事件 (ModelChangedEvent)",
          "fields": [
            {
              "key": "event_store_data",
              "label": "事后记录 (data)",
              "type": "Json",
              "originalKey": "data",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "event_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "event_store_before",
              "label": "事前记录 (before)",
              "type": "Json",
              "originalKey": "before",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_timestamp",
              "label": "发生时间 (timestamp)",
              "type": "Date",
              "originalKey": "timestamp",
              "relationModel": ""
            },
            {
              "key": "event_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "event_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_type",
              "label": "变更类型 (type)",
              "type": "Enum",
              "originalKey": "type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "event_store_recordId",
              "label": "记录id (recordId)",
              "type": "Text",
              "originalKey": "recordId",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_operator",
              "label": "操作人 (operator)",
              "type": "Number",
              "originalKey": "operator",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_actionKey",
              "label": "所属行为 (actionKey)",
              "type": "Text",
              "originalKey": "actionKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "event_store_sequence",
              "label": "序列 (sequence)",
              "type": "Text",
              "originalKey": "sequence",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_actionName",
              "label": "所属行为名 (actionName)",
              "type": "Text",
              "originalKey": "actionName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_source",
              "label": "事件来源 (source)",
              "type": "Enum",
              "originalKey": "source",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_sourceKey",
              "label": "来源标识 (sourceKey)",
              "type": "Text",
              "originalKey": "sourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_modelName",
              "label": "模型名 (modelName)",
              "type": "Text",
              "originalKey": "modelName",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "event_store_ModelChangedEvent",
          "name": "模型变更事件"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_ResourceNode",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "权限 (ResourceNode)",
          "fields": [
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_resourceKey",
              "label": "权限Key (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_resourceType",
              "label": "权限类型 (resourceType)",
              "type": "Text",
              "originalKey": "resourceType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            }
          ],
          "key": "meta_store_ResourceNode",
          "name": "权限"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-base_UploadFile",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "上传的文件 (UploadFile)",
          "fields": [
            {
              "key": "base_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "base_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "base_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "base_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_name",
              "label": "文件名 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            }
          ],
          "key": "base_UploadFile",
          "name": "上传的文件"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-event_store_ActionOperationEvent",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "行为操作时间 (ActionOperationEvent)",
          "fields": [
            {
              "key": "event_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "event_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "event_store_operator",
              "label": "操作人 (operator)",
              "type": "Number",
              "originalKey": "operator",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "event_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "event_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "event_store_sequence",
              "label": "序列 (sequence)",
              "type": "Text",
              "originalKey": "sequence",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_timestamp",
              "label": "发生时间 (timestamp)",
              "type": "Date",
              "originalKey": "timestamp",
              "relationModel": ""
            },
            {
              "key": "event_store_source",
              "label": "事件来源 (source)",
              "type": "Enum",
              "originalKey": "source",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_content",
              "label": "事件内容 (content)",
              "type": "Json",
              "originalKey": "content",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_sourceKey",
              "label": "来源标识 (sourceKey)",
              "type": "Text",
              "originalKey": "sourceKey",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "event_store_ActionOperationEvent",
          "name": "行为操作时间"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_ModuleIcon",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "模型图标 (ModuleIcon)",
          "fields": [
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_iconSvg",
              "label": "svg (iconSvg)",
              "type": "RichText",
              "originalKey": "iconSvg",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            }
          ],
          "key": "meta_store_ModuleIcon",
          "name": "模型图标"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_TemplateFieldInfo",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "模版字段组 (TemplateFieldInfo)",
          "fields": [
            {
              "key": "meta_store_originalFieldName",
              "label": "原字段名 (originalFieldName)",
              "type": "Text",
              "originalKey": "originalFieldName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_parentFieldName",
              "label": "父字段名 (parentFieldName)",
              "type": "Text",
              "originalKey": "parentFieldName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_inClass",
              "label": "所属JavaClass (inClass)",
              "type": "Text",
              "originalKey": "inClass",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            }
          ],
          "key": "meta_store_TemplateFieldInfo",
          "name": "模版字段组"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-base_Staff",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "员工 (Staff)",
          "fields": [
            {
              "key": "base_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_code",
              "label": "工号 (code)",
              "type": "Text",
              "originalKey": "code",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "base_users",
              "label": "关联用户 (users)",
              "type": "ToMany",
              "originalKey": "users",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_company",
              "label": "所属公司 (company)",
              "type": "ToOne",
              "originalKey": "company",
              "isForeign": true,
              "relationModel": "公司"
            },
            {
              "key": "base_concurrentDepartments",
              "label": "兼部门 (concurrentDepartments)",
              "type": "ToMany",
              "originalKey": "concurrentDepartments",
              "isForeign": true,
              "relationModel": "部门"
            },
            {
              "key": "base_primaryDepartment",
              "label": "主部门 (primaryDepartment)",
              "type": "ToOne",
              "originalKey": "primaryDepartment",
              "isForeign": true,
              "relationModel": "部门"
            },
            {
              "key": "base_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "base_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_mobile",
              "label": "手机号 (mobile)",
              "type": "Phone",
              "originalKey": "mobile",
              "relationModel": ""
            },
            {
              "key": "base_outerCode",
              "label": "外部编码 (outerCode)",
              "type": "Text",
              "originalKey": "outerCode",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "base_email",
              "label": "邮箱 (email)",
              "type": "Email",
              "originalKey": "email",
              "relationModel": ""
            },
            {
              "key": "base_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_name",
              "label": "姓名 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_positions",
              "label": "岗位 (positions)",
              "type": "ToMany",
              "originalKey": "positions",
              "isForeign": true,
              "relationModel": "岗位"
            }
          ],
          "key": "base_Staff",
          "name": "员工"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-event_store_ExecutorDefinition",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "执行器 (ExecutorDefinition)",
          "fields": [
            {
              "key": "event_store_type",
              "label": "执行器类型 (type)",
              "type": "Enum",
              "originalKey": "type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "event_store_desc",
              "label": "描述 (desc)",
              "type": "Text",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "event_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "event_store_targetKey",
              "label": "目标标识 (targetKey)",
              "type": "Text",
              "originalKey": "targetKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_name",
              "label": "名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "event_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "event_store_meta",
              "label": "配置 (meta)",
              "type": "Json",
              "originalKey": "meta",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "event_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_triggers",
              "label": "绑定的触发器 (triggers)",
              "type": "ToMany",
              "originalKey": "triggers",
              "isForeign": true,
              "relationModel": "触发器"
            }
          ],
          "key": "event_store_ExecutorDefinition",
          "name": "执行器"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-base_RegisterUser",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "注册用户 (RegisterUser)",
          "fields": [
            {
              "key": "base_avatar",
              "label": "头像 (avatar)",
              "type": "Image",
              "originalKey": "avatar",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "base_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "base_nickname",
              "label": "昵称 (nickname)",
              "type": "Text",
              "originalKey": "nickname",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_pwdExpireAt",
              "label": "密码过期时间 (pwdExpireAt)",
              "type": "Date",
              "originalKey": "pwdExpireAt",
              "relationModel": ""
            },
            {
              "key": "base_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "base_email",
              "label": "邮箱 (email)",
              "type": "Email",
              "originalKey": "email",
              "relationModel": ""
            },
            {
              "key": "base_username",
              "label": "用户名 (username)",
              "type": "Text",
              "originalKey": "username",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_password",
              "label": "密码 (password)",
              "type": "Password",
              "originalKey": "password",
              "relationModel": ""
            },
            {
              "key": "base_enabled",
              "label": "启用 (enabled)",
              "type": "Boolean",
              "originalKey": "enabled",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_locked",
              "label": "锁定 (locked)",
              "type": "Boolean",
              "originalKey": "locked",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_mobile",
              "label": "手机号 (mobile)",
              "type": "Phone",
              "originalKey": "mobile",
              "relationModel": ""
            },
            {
              "key": "base_registrationType",
              "label": "注册方式 (registrationType)",
              "type": "Enum",
              "originalKey": "registrationType",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "base_RegisterUser",
          "name": "注册用户"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_Container",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "数据容器 (Container)",
          "fields": [
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_content",
              "label": "代码内容 (content)",
              "type": "RichText",
              "originalKey": "content",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_forModel",
              "label": "所属模型 (forModel)",
              "type": "ToOne",
              "originalKey": "forModel",
              "isForeign": true,
              "relationModel": "模型"
            },
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_Container",
          "name": "数据容器"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-event_store_InterceptedOperation",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "被拦截操作 (InterceptedOperation)",
          "fields": [
            {
              "key": "event_store_moduleKey",
              "label": "所属模块 (moduleKey)",
              "type": "Text",
              "originalKey": "moduleKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_targetRecord",
              "label": "目标记录标识 (targetRecord)",
              "type": "Text",
              "originalKey": "targetRecord",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "event_store_handledAt",
              "label": "处理时间 (handledAt)",
              "type": "Date",
              "originalKey": "handledAt",
              "relationModel": ""
            },
            {
              "key": "event_store_trigger",
              "label": "触发器 (trigger)",
              "type": "ToOne",
              "originalKey": "trigger",
              "isForeign": true,
              "relationModel": "触发器"
            },
            {
              "key": "event_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "event_store_timeoutAt",
              "label": "超时时间 (timeoutAt)",
              "type": "Date",
              "originalKey": "timeoutAt",
              "relationModel": ""
            },
            {
              "key": "event_store_context",
              "label": "操作上下文 (context)",
              "type": "Json",
              "originalKey": "context",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "event_store_target",
              "label": "目标标识 (target)",
              "type": "Text",
              "originalKey": "target",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "event_store_operator",
              "label": "操作人 (operator)",
              "type": "Number",
              "originalKey": "operator",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "event_store_metaData",
              "label": "操作元信息 (metaData)",
              "type": "Json",
              "originalKey": "metaData",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_status",
              "label": "操作状态 (status)",
              "type": "Enum",
              "originalKey": "status",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_type",
              "label": "操作类型 (type)",
              "type": "Enum",
              "originalKey": "type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_identify",
              "label": "操作身份 (identify)",
              "type": "Text",
              "originalKey": "identify",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "event_store_InterceptedOperation",
          "name": "被拦截操作"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_Model",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "模型 (Model)",
          "fields": [
            {
              "key": "meta_store_fieldGroups",
              "label": "字段组 (fieldGroups)",
              "type": "ToMany",
              "originalKey": "fieldGroups",
              "isForeign": true,
              "relationModel": "模型字段组"
            },
            {
              "key": "meta_store_idRule_rule",
              "label": "规则 (idRule_rule)",
              "type": "Text",
              "originalKey": "idRule_rule",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_aggregateRoot",
              "label": "是否聚合根 (aggregateRoot)",
              "type": "Boolean",
              "originalKey": "aggregateRoot",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_mainFieldName",
              "label": "主字段名 (mainFieldName)",
              "type": "Text",
              "originalKey": "mainFieldName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_fields",
              "label": "字段 (fields)",
              "type": "ToMany",
              "originalKey": "fields",
              "isForeign": true,
              "relationModel": "模型字段"
            },
            {
              "key": "meta_store_idRule_type",
              "label": "类型 (idRule_type)",
              "type": "Enum",
              "originalKey": "idRule_type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_persistent",
              "label": "持久化模型 (persistent)",
              "type": "Boolean",
              "originalKey": "persistent",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_indexes",
              "label": "索引 (indexes)",
              "type": "ToMany",
              "originalKey": "indexes",
              "isForeign": true,
              "relationModel": "索引"
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_config",
              "label": "模型配置 (config)",
              "type": "ToOne",
              "originalKey": "config",
              "isForeign": true,
              "relationModel": "模型配置"
            },
            {
              "key": "meta_store_aggregateClassName",
              "label": "所属聚合 (aggregateClassName)",
              "type": "Text",
              "originalKey": "aggregateClassName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_deleteStrategy",
              "label": "删除策略 (deleteStrategy)",
              "type": "Enum",
              "originalKey": "deleteStrategy",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dbTableName",
              "label": "数据库所在表名 (dbTableName)",
              "type": "Text",
              "originalKey": "dbTableName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_javaClassName",
              "label": "java类名 (javaClassName)",
              "type": "Text",
              "originalKey": "javaClassName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            }
          ],
          "key": "meta_store_Model",
          "name": "模型"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_Validation",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "表单校验 (Validation)",
          "fields": [
            {
              "key": "meta_store_max",
              "label": "最大值 (max)",
              "type": "Number",
              "originalKey": "max",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_min",
              "label": "最小值 (min)",
              "type": "Number",
              "originalKey": "min",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_required",
              "label": "比填 (required)",
              "type": "Boolean",
              "originalKey": "required",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_pattern",
              "label": "正则表达式 (pattern)",
              "type": "Text",
              "originalKey": "pattern",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_message",
              "label": "错误信息 (message)",
              "type": "Text",
              "originalKey": "message",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_Validation",
          "name": "表单校验"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_ImportExport",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "导入导出 (ImportExport)",
          "fields": [
            {
              "key": "meta_store_result",
              "label": "结果 (result)",
              "type": "MultiText",
              "originalKey": "result",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_status",
              "label": "状态 (status)",
              "type": "Text",
              "originalKey": "status",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_modelName",
              "label": "关联模型名称 (modelName)",
              "type": "Text",
              "originalKey": "modelName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_fail",
              "label": "失败数量 (fail)",
              "type": "Number",
              "originalKey": "fail",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_userId",
              "label": "用户 (userId)",
              "type": "Text",
              "originalKey": "userId",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_fileUrl",
              "label": "文件地址 (fileUrl)",
              "type": "Text",
              "originalKey": "fileUrl",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_type",
              "label": "任务类型 (type)",
              "type": "Text",
              "originalKey": "type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_filter",
              "label": "过滤器 (filter)",
              "type": "Json",
              "originalKey": "filter",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_userSelection",
              "label": "用户选择 (userSelection)",
              "type": "Json",
              "originalKey": "userSelection",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_success",
              "label": "成功数量 (success)",
              "type": "Number",
              "originalKey": "success",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_fileName",
              "label": "文件名称 (fileName)",
              "type": "Text",
              "originalKey": "fileName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_modelKey",
              "label": "关联模型标识 (modelKey)",
              "type": "Text",
              "originalKey": "modelKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            }
          ],
          "key": "meta_store_ImportExport",
          "name": "导入导出"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-base_Notice",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "消息 (Notice)",
          "fields": [
            {
              "key": "base_recordId",
              "label": "记录 id (recordId)",
              "type": "Text",
              "originalKey": "recordId",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_viewActionKey",
              "label": "跳转 view action key (viewActionKey)",
              "type": "Text",
              "originalKey": "viewActionKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "base_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "base_status",
              "label": "状态 (status)",
              "type": "Enum",
              "originalKey": "status",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_modelKey",
              "label": "目标 model key (modelKey)",
              "type": "Text",
              "originalKey": "modelKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "base_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_content",
              "label": "内容 (content)",
              "type": "Text",
              "originalKey": "content",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "base_Notice",
          "name": "消息"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_OssToken",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "OssToken",
          "fields": [
            {
              "key": "meta_store_bucket",
              "label": "bucket",
              "type": "Text",
              "originalKey": "bucket",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_accessKeyId",
              "label": "accessKeyId",
              "type": "Text",
              "originalKey": "accessKeyId",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_ossRegion",
              "label": "ossRegion",
              "type": "Text",
              "originalKey": "ossRegion",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_requestId",
              "label": "requestId",
              "type": "Text",
              "originalKey": "requestId",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_expiration",
              "label": "expiration",
              "type": "Text",
              "originalKey": "expiration",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_securityToken",
              "label": "securityToken",
              "type": "MultiText",
              "originalKey": "securityToken",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_accessKeySecret",
              "label": "accessKeySecret",
              "type": "Text",
              "originalKey": "accessKeySecret",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_OssToken",
          "name": "OssToken"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_DataPermission",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "数据权限 (DataPermission)",
          "fields": [
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_name",
              "label": "名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_application",
              "label": "所属应用 (application)",
              "type": "ToOne",
              "originalKey": "application",
              "isForeign": true,
              "relationModel": "应用"
            },
            {
              "key": "meta_store_fieldPermissions",
              "label": "资源配置 (fieldPermissions)",
              "type": "ToMany",
              "originalKey": "fieldPermissions",
              "isForeign": true,
              "relationModel": "字段权限"
            },
            {
              "key": "meta_store_desc",
              "label": "描述 (desc)",
              "type": "Text",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            }
          ],
          "key": "meta_store_DataPermission",
          "name": "数据权限"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-base_User",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "用户 (User)",
          "fields": [
            {
              "key": "base_enabled",
              "label": "启用 (enabled)",
              "type": "Boolean",
              "originalKey": "enabled",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "base_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_locked",
              "label": "锁定 (locked)",
              "type": "Boolean",
              "originalKey": "locked",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_avatar",
              "label": "头像 (avatar)",
              "type": "Image",
              "originalKey": "avatar",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_pwdExpireAt",
              "label": "密码过期时间 (pwdExpireAt)",
              "type": "Date",
              "originalKey": "pwdExpireAt",
              "relationModel": ""
            },
            {
              "key": "base_email",
              "label": "邮箱 (email)",
              "type": "Email",
              "originalKey": "email",
              "relationModel": ""
            },
            {
              "key": "base_username",
              "label": "用户名 (username)",
              "type": "Text",
              "originalKey": "username",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "base_mobile",
              "label": "手机号 (mobile)",
              "type": "Phone",
              "originalKey": "mobile",
              "relationModel": ""
            },
            {
              "key": "base_nickname",
              "label": "昵称 (nickname)",
              "type": "Text",
              "originalKey": "nickname",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "base_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_password",
              "label": "密码 (password)",
              "type": "Password",
              "originalKey": "password",
              "relationModel": ""
            }
          ],
          "key": "base_User",
          "name": "用户"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_Action",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "行为 (Action)",
          "fields": [
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_activated",
              "label": "是否激活 (activated)",
              "type": "Boolean",
              "originalKey": "activated",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_invokeTargetModule",
              "label": "调用目标模块 (invokeTargetModule)",
              "type": "Text",
              "originalKey": "invokeTargetModule",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_model",
              "label": "所属模型 (model)",
              "type": "ToOne",
              "originalKey": "model",
              "isForeign": true,
              "relationModel": "模型"
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_oldKey",
              "label": "0.4.x 版本的 Resource Key (oldKey)",
              "type": "Text",
              "originalKey": "oldKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_type",
              "label": "类型 (type)",
              "type": "Enum",
              "originalKey": "type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_codeActionContent",
              "label": "Server Action内容 (codeActionContent)",
              "type": "Json",
              "originalKey": "codeActionContent",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_viewActionContent",
              "label": "View action内容 (viewActionContent)",
              "type": "Json",
              "originalKey": "viewActionContent",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_Action",
          "name": "行为"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_Menu",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "菜单 (Menu)",
          "fields": [
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_appKey",
              "label": "所属应用Key (appKey)",
              "type": "Text",
              "originalKey": "appKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_sort",
              "label": "菜单排序 (sort)",
              "type": "Number",
              "originalKey": "sort",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_disable",
              "label": "是否禁用 (disable)",
              "type": "Boolean",
              "originalKey": "disable",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_icon",
              "label": "图标 (icon)",
              "type": "Text",
              "originalKey": "icon",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_title",
              "label": "标题 (title)",
              "type": "Text",
              "originalKey": "title",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_routingType",
              "label": "路由类型 (routingType)",
              "type": "Enum",
              "originalKey": "routingType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_permissionId",
              "label": "权限点Id (permissionId)",
              "type": "Number",
              "originalKey": "permissionId",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_routeKey",
              "label": "路由地址 (routeKey)",
              "type": "Text",
              "originalKey": "routeKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isRoot",
              "label": "是否为根节点 (isRoot)",
              "type": "Boolean",
              "originalKey": "isRoot",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_parent",
              "label": "上级菜单 (parent)",
              "type": "ToOne",
              "originalKey": "parent",
              "isForeign": true,
              "relationModel": "菜单"
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_children",
              "label": "下级菜单 (children)",
              "type": "Json",
              "originalKey": "children",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_Menu",
          "name": "菜单"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_ModelConfiguration",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "模型配置 (ModelConfiguration)",
          "fields": [
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_model",
              "label": "所属模型 (model)",
              "type": "ToOne",
              "originalKey": "model",
              "isForeign": true,
              "relationModel": "模型"
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_inputWidget",
              "label": "输入控件 (inputWidget)",
              "type": "Text",
              "originalKey": "inputWidget",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_enableSearch",
              "label": "开启搜索 (enableSearch)",
              "type": "Boolean",
              "originalKey": "enableSearch",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_enableImport",
              "label": "开启导入 (enableImport)",
              "type": "Boolean",
              "originalKey": "enableImport",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_activated",
              "label": "是否激活 (activated)",
              "type": "Boolean",
              "originalKey": "activated",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_showWidget",
              "label": "展示控件 (showWidget)",
              "type": "Text",
              "originalKey": "showWidget",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_enableExport",
              "label": "开启导出 (enableExport)",
              "type": "Boolean",
              "originalKey": "enableExport",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            }
          ],
          "key": "meta_store_ModelConfiguration",
          "name": "模型配置"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_Module",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "模块 (Module)",
          "fields": [
            {
              "key": "meta_store_gatewayPath",
              "label": "gatewayPath",
              "type": "Text",
              "originalKey": "gatewayPath",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_innerGatewayPath",
              "label": "innerGatewayPath",
              "type": "Text",
              "originalKey": "innerGatewayPath",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_packageName",
              "label": "java命名空间 (packageName)",
              "type": "Text",
              "originalKey": "packageName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_description",
              "label": "描述 (description)",
              "type": "Text",
              "originalKey": "description",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_name",
              "label": "名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_embedFrom",
              "label": "embedFrom",
              "type": "Text",
              "originalKey": "embedFrom",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_version",
              "label": "版本 (version)",
              "type": "Text",
              "originalKey": "version",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isLocal",
              "label": "isLocal",
              "type": "Boolean",
              "originalKey": "isLocal",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_installingVersion",
              "label": "installingVersion",
              "type": "Text",
              "originalKey": "installingVersion",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_Module",
          "name": "模块"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_Permission",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "权限 (Permission)",
          "fields": [
            {
              "key": "meta_store_name",
              "label": "权限名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_resources",
              "label": "权限关联的资源 (resources)",
              "type": "ToMany",
              "originalKey": "resources",
              "isForeign": true,
              "relationModel": "权限"
            },
            {
              "key": "meta_store_application",
              "label": "权限所属应用 (application)",
              "type": "ToOne",
              "originalKey": "application",
              "isForeign": true,
              "relationModel": "应用"
            },
            {
              "key": "meta_store_children",
              "label": "下级权限 (children)",
              "type": "Json",
              "originalKey": "children",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_desc",
              "label": "描述信息 (desc)",
              "type": "Text",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_parent",
              "label": "父权限 (parent)",
              "type": "ToOne",
              "originalKey": "parent",
              "isForeign": true,
              "relationModel": "权限"
            },
            {
              "key": "meta_store_permissionType",
              "label": "权限类型 (permissionType)",
              "type": "Enum",
              "originalKey": "permissionType",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_Permission",
          "name": "权限"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_ModelIndex",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "索引 (ModelIndex)",
          "fields": [
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_unique",
              "label": "唯一 (unique)",
              "type": "Boolean",
              "originalKey": "unique",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_activated",
              "label": "是否激活 (activated)",
              "type": "Boolean",
              "originalKey": "activated",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_columns",
              "label": "索引字段 (columns)",
              "type": "Json",
              "originalKey": "columns",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_model",
              "label": "所属模型 (model)",
              "type": "ToOne",
              "originalKey": "model",
              "isForeign": true,
              "relationModel": "模型"
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            }
          ],
          "key": "meta_store_ModelIndex",
          "name": "索引"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-base_Department",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "部门 (Department)",
          "fields": [
            {
              "key": "base_remark",
              "label": "部门详情 (remark)",
              "type": "RichText",
              "originalKey": "remark",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_outerCode",
              "label": "外部编码 (outerCode)",
              "type": "Text",
              "originalKey": "outerCode",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "base_manager",
              "label": "主管 (manager)",
              "type": "ToOne",
              "originalKey": "manager",
              "isForeign": true,
              "relationModel": "员工"
            },
            {
              "key": "base_status",
              "label": "状态 (status)",
              "type": "Enum",
              "originalKey": "status",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "base_parent",
              "label": "上级部门 (parent)",
              "type": "ToOne",
              "originalKey": "parent",
              "isForeign": true,
              "relationModel": "部门"
            },
            {
              "key": "base_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "base_name",
              "label": "部门名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_company",
              "label": "所属公司 (company)",
              "type": "ToOne",
              "originalKey": "company",
              "isForeign": true,
              "relationModel": "公司"
            },
            {
              "key": "base_type",
              "label": "部门类型 (type)",
              "type": "Dictionary",
              "originalKey": "type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_code",
              "label": "部门编码 (code)",
              "type": "Text",
              "originalKey": "code",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "base_Department",
          "name": "部门"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_ModelField",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "模型字段 (ModelField)",
          "fields": [
            {
              "key": "meta_store_defaultValue",
              "label": "默认值 (defaultValue)",
              "type": "Text",
              "originalKey": "defaultValue",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dbColumnName",
              "label": "数据库列名 (dbColumnName)",
              "type": "Text",
              "originalKey": "dbColumnName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_systemField",
              "label": "系统字段 (systemField)",
              "type": "Boolean",
              "originalKey": "systemField",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_domainType",
              "label": "领域对象类型 (domainType)",
              "type": "Enum",
              "originalKey": "domainType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_javaType",
              "label": "Java字段类型 (javaType)",
              "type": "Text",
              "originalKey": "javaType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_permission",
              "label": "字段授权 (permission)",
              "type": "Enum",
              "originalKey": "permission",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_type",
              "label": "类型 (type)",
              "type": "Enum",
              "originalKey": "type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_typeMeta",
              "label": "字段元信息 (typeMeta)",
              "type": "Json",
              "originalKey": "typeMeta",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_templateFieldInfo",
              "label": "校验信息 (templateFieldInfo)",
              "type": "Json",
              "originalKey": "templateFieldInfo",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_fieldReference",
              "label": "冗余字段信息 (fieldReference)",
              "type": "Json",
              "originalKey": "fieldReference",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_validations",
              "label": "表单校验信息 (validations)",
              "type": "Json",
              "originalKey": "validations",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dbTableName",
              "label": "数据库所在表名 (dbTableName)",
              "type": "Text",
              "originalKey": "dbTableName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_model",
              "label": "所属模型 (model)",
              "type": "ToOne",
              "originalKey": "model",
              "isForeign": true,
              "relationModel": "模型"
            },
            {
              "key": "meta_store_nullable",
              "label": "可空 (nullable)",
              "type": "Boolean",
              "originalKey": "nullable",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_persistent",
              "label": "持久化 (persistent)",
              "type": "Boolean",
              "originalKey": "persistent",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_activated",
              "label": "是否激活 (activated)",
              "type": "Boolean",
              "originalKey": "activated",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_ModelField",
          "name": "模型字段"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_I18NText",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "国际化文本 (I18NText)",
          "fields": [
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_content",
              "label": "内容 (content)",
              "type": "RichText",
              "originalKey": "content",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_type",
              "label": "类型 (type)",
              "type": "Enum",
              "originalKey": "type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_moduleKey",
              "label": "所属模块 (moduleKey)",
              "type": "Text",
              "originalKey": "moduleKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_locale",
              "label": "语言 (locale)",
              "type": "Text",
              "originalKey": "locale",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            }
          ],
          "key": "meta_store_I18NText",
          "name": "国际化文本"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_DictionaryItem",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "字典项 (DictionaryItem)",
          "fields": [
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_iconColor",
              "label": "图标颜色 (iconColor)",
              "type": "Enum",
              "originalKey": "iconColor",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_disabled",
              "label": "字典项禁用 (disabled)",
              "type": "Boolean",
              "originalKey": "disabled",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_label",
              "label": "字典默认显示值 (label)",
              "type": "Text",
              "originalKey": "label",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_icon",
              "label": "字典项图标 (icon)",
              "type": "Enum",
              "originalKey": "icon",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dictionary",
              "label": "所属字典 (dictionary)",
              "type": "ToOne",
              "originalKey": "dictionary",
              "isForeign": true,
              "relationModel": "字典"
            }
          ],
          "key": "meta_store_DictionaryItem",
          "name": "字典项"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_Dictionary",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "字典 (Dictionary)",
          "fields": [
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_originalDigester",
              "label": "originalDigester",
              "type": "Text",
              "originalKey": "originalDigester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_editable",
              "label": "用户端是否可编辑 (editable)",
              "type": "Boolean",
              "originalKey": "editable",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_key",
              "label": "资源唯一标识 (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_originalKey",
              "label": "资源原标识 (originalKey)",
              "type": "Text",
              "originalKey": "originalKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_digester",
              "label": "digester",
              "type": "Text",
              "originalKey": "digester",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_desc",
              "label": "资源描述 (desc)",
              "type": "MultiText",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "meta_store_modificationType",
              "label": "资源类型 (modificationType)",
              "type": "Enum",
              "originalKey": "modificationType",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_name",
              "label": "资源名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_dependedResource",
              "label": "dependedResource",
              "type": "Boolean",
              "originalKey": "dependedResource",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_resourceKey",
              "label": "资源识别标识 (resourceKey)",
              "type": "Text",
              "originalKey": "resourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_items",
              "label": "字典项 (items)",
              "type": "ToMany",
              "originalKey": "items",
              "isForeign": true,
              "relationModel": "字典项"
            }
          ],
          "key": "meta_store_Dictionary",
          "name": "字典"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_FieldReference",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "冗余字段 (FieldReference)",
          "fields": [
            {
              "key": "meta_store_onchange",
              "label": "变更同步策略 (onchange)",
              "type": "Enum",
              "originalKey": "onchange",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_fromField",
              "label": "从属字段 (fromField)",
              "type": "Text",
              "originalKey": "fromField",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_mappingField",
              "label": "映射字段 (mappingField)",
              "type": "Text",
              "originalKey": "mappingField",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_fromModel",
              "label": "所属模型 (fromModel)",
              "type": "Text",
              "originalKey": "fromModel",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            }
          ],
          "key": "meta_store_FieldReference",
          "name": "冗余字段"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-base_Position",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "岗位 (Position)",
          "fields": [
            {
              "key": "base_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_remark",
              "label": "岗位详情 (remark)",
              "type": "RichText",
              "originalKey": "remark",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "base_code",
              "label": "岗位编码 (code)",
              "type": "Text",
              "originalKey": "code",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_type",
              "label": "岗位类型 (type)",
              "type": "Dictionary",
              "originalKey": "type",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_status",
              "label": "状态 (status)",
              "type": "Enum",
              "originalKey": "status",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_outerCode",
              "label": "外部编码 (outerCode)",
              "type": "Text",
              "originalKey": "outerCode",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "base_name",
              "label": "岗位名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "base_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "base_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            }
          ],
          "key": "base_Position",
          "name": "岗位"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-meta_store_Application",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "应用 (Application)",
          "fields": [
            {
              "key": "meta_store_name",
              "label": "应用名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_roleName",
              "label": "预制角色名称 (roleName)",
              "type": "Text",
              "originalKey": "roleName",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_key",
              "label": "应用key (key)",
              "type": "Text",
              "originalKey": "key",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "meta_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "meta_store_domain",
              "label": "域名配置 (domain)",
              "type": "Text",
              "originalKey": "domain",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "meta_store_icon",
              "label": "应用icon (icon)",
              "type": "Text",
              "originalKey": "icon",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_roleId",
              "label": "预制角色Id (roleId)",
              "type": "Number",
              "originalKey": "roleId",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "meta_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            }
          ],
          "key": "meta_store_Application",
          "name": "应用"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      },
      {
        "id": "model-event_store_TriggerDefinition",
        "hide": false,
        "config": {
          "width": 720,
          "headerHeight": 48,
          "fieldHeight": 40,
          "hide": false,
          "styleConfig": {
            "naviWidth": 370,
            "default": {
              "node": {
                "fill": "#FFFFFF",
                "shadowColor": "rgba(0,0,0,0.06)",
                "shadowBlur": 15,
                "shadowOffsetX": 8,
                "shadowOffsetY": 8,
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1,
                "size": 2,
                "endArrow": {
                  "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                  "d": 6
                },
                "radius": 5,
                "startArrow": {
                  "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                  "d": 3
                },
                "labelCfg": {
                  "autoRotate": true,
                  "style": {
                    "stroke": "#AEC1DE",
                    "lineWidth": 2,
                    "fill": "#AEC1DE"
                  }
                },
                "stroke": "#AEC1DE"
              }
            },
            "inactive": {
              "node": {
                "opacity": 0.2
              },
              "edge": {
                "opacity": 0.2
              }
            },
            "active": {
              "node": {
                "fill": "#FFFFFF",
                "stroke": "#FFFFFF",
                "opacity": 1
              },
              "edge": {
                "lineWidth": 3,
                "opacity": 1
              }
            },
            "selected": {
              "node": {
                "fill": "#AEC1DE",
                "opacity": 1
              },
              "edge": {}
            },
            "out": {
              "edge": {
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            },
            "into": {
              "edge": {
                "size": 1.5,
                "opacity": 1
              },
              "node": {
                "opacity": 1,
                "fill": "#FFFFFF"
              }
            }
          }
        },
        "data": {
          "label": "触发器 (TriggerDefinition)",
          "fields": [
            {
              "key": "event_store_createdBy",
              "label": "创建人 (createdBy)",
              "type": "ToOne",
              "originalKey": "createdBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "event_store_name",
              "label": "名称 (name)",
              "type": "Text",
              "originalKey": "name",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_module",
              "label": "所属模块 (module)",
              "type": "ToOne",
              "originalKey": "module",
              "isForeign": true,
              "relationModel": "模块"
            },
            {
              "key": "event_store_source",
              "label": "事件源 (source)",
              "type": "Enum",
              "originalKey": "source",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_executors",
              "label": "绑定的执行器 (executors)",
              "type": "ToMany",
              "originalKey": "executors",
              "isForeign": true,
              "relationModel": "执行器"
            },
            {
              "key": "event_store_updatedAt",
              "label": "更新时间 (updatedAt)",
              "type": "Date",
              "originalKey": "updatedAt",
              "relationModel": ""
            },
            {
              "key": "event_store_id",
              "label": "标识 (id)",
              "type": "Identifier",
              "originalKey": "id",
              "relationModel": ""
            },
            {
              "key": "event_store_config",
              "label": "配置 (config)",
              "type": "Json",
              "originalKey": "config",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_desc",
              "label": "描述 (desc)",
              "type": "Text",
              "originalKey": "desc",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_priority",
              "label": "事件优先级 (priority)",
              "type": "Enum",
              "originalKey": "priority",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_updatedBy",
              "label": "最后修改人 (updatedBy)",
              "type": "ToOne",
              "originalKey": "updatedBy",
              "isForeign": true,
              "relationModel": "用户"
            },
            {
              "key": "event_store_isDeleted",
              "label": "是否删除 (isDeleted)",
              "type": "Boolean",
              "originalKey": "isDeleted",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_sourceKey",
              "label": "来源标识 (sourceKey)",
              "type": "Text",
              "originalKey": "sourceKey",
              "isForeign": false,
              "relationModel": ""
            },
            {
              "key": "event_store_createdAt",
              "label": "创建时间 (createdAt)",
              "type": "Date",
              "originalKey": "createdAt",
              "relationModel": ""
            }
          ],
          "key": "event_store_TriggerDefinition",
          "name": "触发器"
        },
        "shape": "console-model-Node",
        "isKeySharp": true
      }
    ],
    "edges": [
      {
        "key": "model-meta_store_View~NaNmodel-meta_store_Model",
        "source": "model-meta_store_View",
        "target": "model-meta_store_Model",
        "sourceAnchor": 15,
        "fieldIndex": 13,
        "fieldsLength": 26,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_View~NaNmodel-meta_store_Module",
        "source": "model-meta_store_View",
        "target": "model-meta_store_Module",
        "sourceAnchor": 18,
        "fieldIndex": 16,
        "fieldsLength": 26,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-base_Company~NaNmodel-base_Company",
        "source": "model-base_Company",
        "target": "model-base_Company",
        "sourceAnchor": 4,
        "targetAnchor": 3,
        "fieldIndex": 2,
        "fieldsLength": 18,
        "shape": "loop",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_ModelFieldGroup~NaNmodel-meta_store_Module",
        "source": "model-meta_store_ModelFieldGroup",
        "target": "model-meta_store_Module",
        "sourceAnchor": 3,
        "fieldIndex": 1,
        "fieldsLength": 20,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_ModelFieldGroup~NaNmodel-meta_store_Model",
        "source": "model-meta_store_ModelFieldGroup",
        "target": "model-meta_store_Model",
        "sourceAnchor": 19,
        "fieldIndex": 17,
        "fieldsLength": 20,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Widget~NaNmodel-meta_store_Module",
        "source": "model-meta_store_Widget",
        "target": "model-meta_store_Module",
        "sourceAnchor": 8,
        "fieldIndex": 6,
        "fieldsLength": 19,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Widget~NaNmodel-meta_store_Model",
        "source": "model-meta_store_Widget",
        "target": "model-meta_store_Model",
        "sourceAnchor": 18,
        "fieldIndex": 16,
        "fieldsLength": 19,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_ModuleIcon~NaNmodel-meta_store_Module",
        "source": "model-meta_store_ModuleIcon",
        "target": "model-meta_store_Module",
        "sourceAnchor": 16,
        "fieldIndex": 14,
        "fieldsLength": 17,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-base_Staff~NaNmodel-base_Company",
        "source": "model-base_Staff",
        "target": "model-base_Company",
        "sourceAnchor": 6,
        "fieldIndex": 4,
        "fieldsLength": 16,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-base_Staff~NaNmodel-base_Department",
        "source": "model-base_Staff",
        "target": "model-base_Department",
        "sourceAnchor": 7,
        "fieldIndex": 5,
        "fieldsLength": 16,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToMany",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-base_Staff~NaNmodel-base_Department",
        "source": "model-base_Staff",
        "target": "model-base_Department",
        "sourceAnchor": 8,
        "fieldIndex": 6,
        "fieldsLength": 16,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-base_Staff~NaNmodel-base_Position",
        "source": "model-base_Staff",
        "target": "model-base_Position",
        "sourceAnchor": 17,
        "fieldIndex": 15,
        "fieldsLength": 16,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToMany",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-event_store_ExecutorDefinition~NaNmodel-meta_store_Module",
        "source": "model-event_store_ExecutorDefinition",
        "target": "model-meta_store_Module",
        "sourceAnchor": 3,
        "fieldIndex": 1,
        "fieldsLength": 13,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-event_store_ExecutorDefinition~NaNmodel-event_store_TriggerDefinition",
        "source": "model-event_store_ExecutorDefinition",
        "target": "model-event_store_TriggerDefinition",
        "sourceAnchor": 14,
        "fieldIndex": 12,
        "fieldsLength": 13,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToMany",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Container~NaNmodel-meta_store_Module",
        "source": "model-meta_store_Container",
        "target": "model-meta_store_Module",
        "sourceAnchor": 5,
        "fieldIndex": 3,
        "fieldsLength": 18,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Container~NaNmodel-meta_store_Model",
        "source": "model-meta_store_Container",
        "target": "model-meta_store_Model",
        "sourceAnchor": 16,
        "fieldIndex": 14,
        "fieldsLength": 18,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-event_store_InterceptedOperation~NaNmodel-event_store_TriggerDefinition",
        "source": "model-event_store_InterceptedOperation",
        "target": "model-event_store_TriggerDefinition",
        "sourceAnchor": 6,
        "fieldIndex": 4,
        "fieldsLength": 18,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Model~NaNmodel-meta_store_ModelFieldGroup",
        "source": "model-meta_store_Model",
        "target": "model-meta_store_ModelFieldGroup",
        "sourceAnchor": 2,
        "fieldIndex": 0,
        "fieldsLength": 29,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToMany",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Model~NaNmodel-meta_store_ModelField",
        "source": "model-meta_store_Model",
        "target": "model-meta_store_ModelField",
        "sourceAnchor": 6,
        "fieldIndex": 4,
        "fieldsLength": 29,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToMany",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Model~NaNmodel-meta_store_ModelIndex",
        "source": "model-meta_store_Model",
        "target": "model-meta_store_ModelIndex",
        "sourceAnchor": 13,
        "fieldIndex": 11,
        "fieldsLength": 29,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToMany",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Model~NaNmodel-meta_store_ModelConfiguration",
        "source": "model-meta_store_Model",
        "target": "model-meta_store_ModelConfiguration",
        "sourceAnchor": 15,
        "fieldIndex": 13,
        "fieldsLength": 29,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Model~NaNmodel-meta_store_Module",
        "source": "model-meta_store_Model",
        "target": "model-meta_store_Module",
        "sourceAnchor": 30,
        "fieldIndex": 28,
        "fieldsLength": 29,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_DataPermission~NaNmodel-meta_store_Application",
        "source": "model-meta_store_DataPermission",
        "target": "model-meta_store_Application",
        "sourceAnchor": 7,
        "fieldIndex": 5,
        "fieldsLength": 10,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_DataPermission~NaNmodel-meta_store_FieldPermission",
        "source": "model-meta_store_DataPermission",
        "target": "model-meta_store_FieldPermission",
        "sourceAnchor": 8,
        "fieldIndex": 6,
        "fieldsLength": 10,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToMany",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Action~NaNmodel-meta_store_Model",
        "source": "model-meta_store_Action",
        "target": "model-meta_store_Model",
        "sourceAnchor": 13,
        "fieldIndex": 11,
        "fieldsLength": 23,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Action~NaNmodel-meta_store_Module",
        "source": "model-meta_store_Action",
        "target": "model-meta_store_Module",
        "sourceAnchor": 14,
        "fieldIndex": 12,
        "fieldsLength": 23,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Menu~NaNmodel-meta_store_Module",
        "source": "model-meta_store_Menu",
        "target": "model-meta_store_Module",
        "sourceAnchor": 17,
        "fieldIndex": 15,
        "fieldsLength": 27,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Menu~NaNmodel-meta_store_Menu",
        "source": "model-meta_store_Menu",
        "target": "model-meta_store_Menu",
        "sourceAnchor": 23,
        "targetAnchor": 22,
        "fieldIndex": 21,
        "fieldsLength": 27,
        "shape": "loop",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_ModelConfiguration~NaNmodel-meta_store_Model",
        "source": "model-meta_store_ModelConfiguration",
        "target": "model-meta_store_Model",
        "sourceAnchor": 4,
        "fieldIndex": 2,
        "fieldsLength": 23,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_ModelConfiguration~NaNmodel-meta_store_Module",
        "source": "model-meta_store_ModelConfiguration",
        "target": "model-meta_store_Module",
        "sourceAnchor": 6,
        "fieldIndex": 4,
        "fieldsLength": 23,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Permission~NaNmodel-meta_store_ResourceNode",
        "source": "model-meta_store_Permission",
        "target": "model-meta_store_ResourceNode",
        "sourceAnchor": 3,
        "fieldIndex": 1,
        "fieldsLength": 13,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToMany",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Permission~NaNmodel-meta_store_Application",
        "source": "model-meta_store_Permission",
        "target": "model-meta_store_Application",
        "sourceAnchor": 4,
        "fieldIndex": 2,
        "fieldsLength": 13,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Permission~NaNmodel-meta_store_Permission",
        "source": "model-meta_store_Permission",
        "target": "model-meta_store_Permission",
        "sourceAnchor": 13,
        "targetAnchor": 12,
        "fieldIndex": 11,
        "fieldsLength": 13,
        "shape": "loop",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_ModelIndex~NaNmodel-meta_store_Module",
        "source": "model-meta_store_ModelIndex",
        "target": "model-meta_store_Module",
        "sourceAnchor": 9,
        "fieldIndex": 7,
        "fieldsLength": 20,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_ModelIndex~NaNmodel-meta_store_Model",
        "source": "model-meta_store_ModelIndex",
        "target": "model-meta_store_Model",
        "sourceAnchor": 17,
        "fieldIndex": 15,
        "fieldsLength": 20,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-base_Department~NaNmodel-base_Staff",
        "source": "model-base_Department",
        "target": "model-base_Staff",
        "sourceAnchor": 5,
        "fieldIndex": 3,
        "fieldsLength": 15,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-base_Department~NaNmodel-base_Department",
        "source": "model-base_Department",
        "target": "model-base_Department",
        "sourceAnchor": 8,
        "targetAnchor": 7,
        "fieldIndex": 6,
        "fieldsLength": 15,
        "shape": "loop",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-base_Department~NaNmodel-base_Company",
        "source": "model-base_Department",
        "target": "model-base_Company",
        "sourceAnchor": 12,
        "fieldIndex": 10,
        "fieldsLength": 15,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_ModelField~NaNmodel-meta_store_Module",
        "source": "model-meta_store_ModelField",
        "target": "model-meta_store_Module",
        "sourceAnchor": 16,
        "fieldIndex": 14,
        "fieldsLength": 32,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_ModelField~NaNmodel-meta_store_Model",
        "source": "model-meta_store_ModelField",
        "target": "model-meta_store_Model",
        "sourceAnchor": 28,
        "fieldIndex": 26,
        "fieldsLength": 32,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_DictionaryItem~NaNmodel-meta_store_Module",
        "source": "model-meta_store_DictionaryItem",
        "target": "model-meta_store_Module",
        "sourceAnchor": 11,
        "fieldIndex": 9,
        "fieldsLength": 21,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_DictionaryItem~NaNmodel-meta_store_Dictionary",
        "source": "model-meta_store_DictionaryItem",
        "target": "model-meta_store_Dictionary",
        "sourceAnchor": 22,
        "fieldIndex": 20,
        "fieldsLength": 21,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Dictionary~NaNmodel-meta_store_Module",
        "source": "model-meta_store_Dictionary",
        "target": "model-meta_store_Module",
        "sourceAnchor": 14,
        "fieldIndex": 12,
        "fieldsLength": 18,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-meta_store_Dictionary~NaNmodel-meta_store_DictionaryItem",
        "source": "model-meta_store_Dictionary",
        "target": "model-meta_store_DictionaryItem",
        "sourceAnchor": 19,
        "fieldIndex": 17,
        "fieldsLength": 18,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToMany",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-event_store_TriggerDefinition~NaNmodel-meta_store_Module",
        "source": "model-event_store_TriggerDefinition",
        "target": "model-meta_store_Module",
        "sourceAnchor": 4,
        "fieldIndex": 2,
        "fieldsLength": 14,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToOne",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      },
      {
        "key": "model-event_store_TriggerDefinition~NaNmodel-event_store_ExecutorDefinition",
        "source": "model-event_store_TriggerDefinition",
        "target": "model-event_store_ExecutorDefinition",
        "sourceAnchor": 6,
        "fieldIndex": 4,
        "fieldsLength": 14,
        "shape": "console-line",
        "style": {
          "lineWidth": 3,
          "opacity": 1,
          "size": 2,
          "endArrow": {
            "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
            "d": 6
          },
          "radius": 5,
          "startArrow": {
            "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
            "d": 3
          },
          "labelCfg": {
            "autoRotate": true,
            "style": {
              "stroke": "#AEC1DE",
              "lineWidth": 2,
              "fill": "#AEC1DE"
            }
          },
          "stroke": "#AEC1DE"
        },
        "styleConfig": {
          "naviWidth": 370,
          "default": {
            "node": {
              "fill": "#FFFFFF",
              "shadowColor": "rgba(0,0,0,0.06)",
              "shadowBlur": 15,
              "shadowOffsetX": 8,
              "shadowOffsetY": 8,
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1,
              "size": 2,
              "endArrow": {
                "path": "M 6,0 L -6,-6 L -3,0 L -6,6 Z",
                "d": 6
              },
              "radius": 5,
              "startArrow": {
                "path": "M 12,10 L 12,-10 L 2, -6, L 2,6 Z",
                "d": 3
              },
              "labelCfg": {
                "autoRotate": true,
                "style": {
                  "stroke": "#AEC1DE",
                  "lineWidth": 2,
                  "fill": "#AEC1DE"
                }
              },
              "stroke": "#AEC1DE"
            }
          },
          "inactive": {
            "node": {
              "opacity": 0.2
            },
            "edge": {
              "opacity": 0.2
            }
          },
          "active": {
            "node": {
              "fill": "#FFFFFF",
              "stroke": "#FFFFFF",
              "opacity": 1
            },
            "edge": {
              "lineWidth": 3,
              "opacity": 1
            }
          },
          "selected": {
            "node": {
              "fill": "#AEC1DE",
              "opacity": 1
            },
            "edge": {}
          },
          "out": {
            "edge": {
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          },
          "into": {
            "edge": {
              "size": 1.5,
              "opacity": 1
            },
            "node": {
              "opacity": 1,
              "fill": "#FFFFFF"
            }
          }
        },
        "label": "ToMany",
        "labelAutoRotate": true,
        "loopCfg": {
          "clockwise": true,
          "dist": 100
        }
      }
    ]
  }