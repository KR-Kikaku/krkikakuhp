{
  "name": "Contact",
  "type": "object",
  "properties": {
    "company_name": {
      "type": "string",
      "description": "\u4f1a\u793e\u540d"
    },
    "name": {
      "type": "string",
      "description": "\u304a\u540d\u524d"
    },
    "email": {
      "type": "string",
      "description": "\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"
    },
    "phone": {
      "type": "string",
      "description": "\u96fb\u8a71\u756a\u53f7"
    },
    "message": {
      "type": "string",
      "description": "\u304a\u554f\u3044\u5408\u308f\u305b\u5185\u5bb9"
    },
    "is_read": {
      "type": "boolean",
      "description": "\u65e2\u8aad\u30d5\u30e9\u30b0",
      "default": false
    },
    "needs_reply": {
      "type": "boolean",
      "description": "\u8fd4\u4fe1\u5fc5\u8981\u30d5\u30e9\u30b0",
      "default": true
    },
    "replies": {
      "type": "array",
      "description": "\u8fd4\u4fe1\u30b9\u30ec\u30c3\u30c9",
      "items": {
        "type": "object",
        "properties": {
          "from": {
            "type": "string",
            "description": "\u9001\u4fe1\u8005"
          },
          "message": {
            "type": "string",
            "description": "\u30e1\u30c3\u30bb\u30fc\u30b8"
          },
          "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "\u9001\u4fe1\u65e5\u6642"
          }
        }
      },
      "default": []
    }
  },
  "required": [],
  "rls": {
    "create": true,
    "read": true,
    "update": true,
    "delete": true
  }
}