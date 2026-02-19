{
  "name": "News",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "\u30bf\u30a4\u30c8\u30eb"
    },
    "slug": {
      "type": "string",
      "description": "\u30b9\u30e9\u30c3\u30b0(URL\u7528)"
    },
    "content": {
      "type": "string",
      "description": "\u672c\u6587(HTML)"
    },
    "cover_image": {
      "type": "string",
      "description": "\u30ab\u30d0\u30fc\u753b\u50cfURL"
    },
    "thumbnail_image": {
      "type": "string",
      "description": "\u30b5\u30e0\u30cd\u30a4\u30eb\u753b\u50cfURL"
    },
    "category": {
      "type": "string",
      "enum": [
        "\u304a\u77e5\u3089\u305b",
        "\u30a4\u30d9\u30f3\u30c8",
        "\u30d7\u30ec\u30b9\u30ea\u30ea\u30fc\u30b9",
        "\u305d\u306e\u4ed6"
      ],
      "description": "\u30ab\u30c6\u30b4\u30ea\u30fc"
    },
    "status": {
      "type": "string",
      "enum": [
        "draft",
        "published"
      ],
      "description": "\u30b9\u30c6\u30fc\u30bf\u30b9"
    },
    "publish_date": {
      "type": "string",
      "format": "date-time",
      "description": "\u516c\u958b\u65e5\u6642"
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