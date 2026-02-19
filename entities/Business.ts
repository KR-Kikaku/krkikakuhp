{
  "name": "Business",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "\u4e8b\u696d\u30bf\u30a4\u30c8\u30eb"
    },
    "title_link": {
      "type": "string",
      "description": "\u30bf\u30a4\u30c8\u30eb\u30ea\u30f3\u30afURL"
    },
    "description": {
      "type": "string",
      "description": "\u4e8b\u696d\u8aac\u660e"
    },
    "images": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string"
          },
          "link": {
            "type": "string"
          }
        }
      },
      "description": "\u7d39\u4ecb\u753b\u50cf\uff08\u6700\u59273\u679a\uff09"
    },
    "order": {
      "type": "number",
      "description": "\u8868\u793a\u9806"
    },
    "is_active": {
      "type": "boolean",
      "description": "\u8868\u793a/\u975e\u8868\u793a"
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