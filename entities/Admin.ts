{
  "name": "Admin",
  "type": "object",
  "properties": {
    "login_id": {
      "type": "string",
      "description": "\u30ed\u30b0\u30a4\u30f3ID"
    },
    "password": {
      "type": "string",
      "description": "\u30d1\u30b9\u30ef\u30fc\u30c9"
    },
    "name": {
      "type": "string",
      "description": "\u7ba1\u7406\u8005\u540d"
    },
    "is_active": {
      "type": "boolean",
      "description": "\u6709\u52b9/\u7121\u52b9"
    }
  },
  "required": [],
  "rls": {
    "create": false,
    "read": true,
    "update": false,
    "delete": false
  }
}