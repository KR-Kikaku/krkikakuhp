{
  "name": "CarouselImage",
  "type": "object",
  "properties": {
    "image_url": {
      "type": "string",
      "description": "\u753b\u50cfURL"
    },
    "link_url": {
      "type": "string",
      "description": "\u30ea\u30f3\u30afURL"
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