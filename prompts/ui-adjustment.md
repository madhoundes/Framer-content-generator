01 could you make min height of this plugin = 746px 
to ensure that all elements ui,buttons , components are disaply without need to make scroller .

02 for Action buttons ID container 
    Make the action-button container fixed at the bottom of the viewport. Ensure it stays visible as the user scrolls and remains centered horizontally. The container should maintain its position and functionality across different screen sizes.
here are styling for action button container 
{
  "id": "126:883",
  "name": "Buttons-container",
  "type": "FRAME",
  "x": 1941,
  "y": 675,
  "width": 320,
  "height": 68,
  "relativeTransform": [
    [
      1,
      0,
      1941
    ],
    [
      0,
      1,
      675
    ]
  ],
  "constraints": {
    "horizontal": "CENTER",
    "vertical": "MIN"
  },
  "fills": [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 0.250980406999588,
        "g": 0.250980406999588,
        "b": 0.250980406999588
      },
      "boundVariables": {}
    }
  ],
  "strokes": [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 0.32156863808631897,
        "g": 0.32156863808631897,
        "b": 0.32156863808631897
      },
      "boundVariables": {}
    }
  ],
  "cornerRadius": 0,
  "effects": [],
  "blendMode": "PASS_THROUGH",
  "layoutAlign": "INHERIT",
  "layoutGrow": 0,
  "layoutMode": "HORIZONTAL",
  "itemSpacing": 12,
  "children": [
    {
      "id": "126:884",
      "name": "button",
      "type": "INSTANCE",
      "x": 23,
      "y": 17,
      "width": 131,
      "height": 34,
      "relativeTransform": [
        [
          1,
          0,
          23
        ],
        [
          0,
          1,
          17
        ]
      ],
      "constraints": {
        "horizontal": "MIN",
        "vertical": "MIN"
      },
      "fills": [
        {
          "type": "SOLID",
          "visible": true,
          "opacity": 1,
          "blendMode": "NORMAL",
          "color": {
            "r": 0.14901961386203766,
            "g": 0.14901961386203766,
            "b": 0.14901961386203766
          },
          "boundVariables": {}
        }
      ],
      "strokes": [
        {
          "type": "SOLID",
          "visible": true,
          "opacity": 1,
          "blendMode": "NORMAL",
          "color": {
            "r": 0.32156863808631897,
            "g": 0.32156863808631897,
            "b": 0.32156863808631897
          },
          "boundVariables": {}
        }
      ],
      "strokeWeight": 1,
      "cornerRadius": 6,
      "effects": [],
      "blendMode": "PASS_THROUGH",
      "layoutAlign": "INHERIT",
      "layoutGrow": 1,
      "layoutMode": "HORIZONTAL",
      "itemSpacing": 10,
      "children": [
        {
          "id": "I126:884;1:59",
          "name": "Continue",
          "type": "TEXT",
          "x": 17.5,
          "y": 5,
          "width": 96,
          "height": 24,
          "relativeTransform": [
            [
              1,
              0,
              17.5
            ],
            [
              0,
              1,
              5
            ]
          ],
          "constraints": {
            "horizontal": "MIN",
            "vertical": "MIN"
          },
          "fills": [
            {
              "type": "SOLID",
              "visible": true,
              "opacity": 1,
              "blendMode": "NORMAL",
              "color": {
                "r": 1,
                "g": 1,
                "b": 1
              },
              "boundVariables": {}
            }
          ],
          "strokes": [],
          "strokeWeight": 1,
          "effects": [],
          "blendMode": "PASS_THROUGH",
          "layoutAlign": "INHERIT",
          "layoutGrow": 0,
          "children": []
        }
      ]
    },
    {
      "id": "126:885",
      "name": "button",
      "type": "INSTANCE",
      "x": 166,
      "y": 17,
      "width": 131,
      "height": 34,
      "relativeTransform": [
        [
          1,
          0,
          166
        ],
        [
          0,
          1,
          17
        ]
      ],
      "constraints": {
        "horizontal": "MIN",
        "vertical": "MIN"
      },
      "fills": [
        {
          "type": "SOLID",
          "visible": true,
          "opacity": 1,
          "blendMode": "NORMAL",
          "color": {
            "r": 0.23137255012989044,
            "g": 0.5098039507865906,
            "b": 0.9647058844566345
          },
          "boundVariables": {}
        }
      ],
      "strokes": [
        {
          "type": "SOLID",
          "visible": true,
          "opacity": 1,
          "blendMode": "NORMAL",
          "color": {
            "r": 0.3764705955982208,
            "g": 0.6470588445663452,
            "b": 0.9803921580314636
          },
          "boundVariables": {}
        }
      ],
      "strokeWeight": 1,
      "cornerRadius": 6,
      "effects": [
        {
          "type": "DROP_SHADOW",
          "radius": 6,
          "visible": true,
          "boundVariables": {},
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.09000000357627869
          },
          "offset": {
            "x": 0,
            "y": 4
          },
          "spread": 0,
          "blendMode": "NORMAL",
          "showShadowBehindNode": false
        }
      ],
      "blendMode": "PASS_THROUGH",
      "layoutAlign": "INHERIT",
      "layoutGrow": 1,
      "layoutMode": "HORIZONTAL",
      "itemSpacing": 6,
      "children": [
        {
          "id": "I126:885;13:2244",
          "name": "icon/plus",
          "type": "INSTANCE",
          "x": 16,
          "y": 12,
          "width": 16,
          "height": 16,
          "relativeTransform": [
            [
              1,
              0,
              16
            ],
            [
              0,
              1,
              12
            ]
          ],
          "constraints": {
            "horizontal": "MIN",
            "vertical": "MIN"
          },
          "fills": [
            {
              "type": "SOLID",
              "visible": false,
              "opacity": 1,
              "blendMode": "NORMAL",
              "color": {
                "r": 1,
                "g": 1,
                "b": 1
              },
              "boundVariables": {}
            }
          ],
          "strokes": [],
          "strokeWeight": 1,
          "cornerRadius": 0,
          "effects": [],
          "blendMode": "PASS_THROUGH",
          "layoutAlign": "INHERIT",
          "layoutGrow": 0,
          "layoutMode": "NONE",
          "itemSpacing": 0,
          "children": [
            {
              "id": "I126:885;13:2244;4:3498",
              "name": "Vector",
              "type": "VECTOR",
              "x": 8,
              "y": 3.3333332538604736,
              "width": 0,
              "height": 9.333333969116211,
              "relativeTransform": [
                [
                  1,
                  0,
                  8
                ],
                [
                  0,
                  1,
                  3.3333332538604736
                ]
              ],
              "constraints": {
                "horizontal": "SCALE",
                "vertical": "SCALE"
              },
              "fills": [],
              "strokes": [
                {
                  "type": "SOLID",
                  "visible": true,
                  "opacity": 1,
                  "blendMode": "NORMAL",
                  "color": {
                    "r": 1,
                    "g": 1,
                    "b": 1
                  },
                  "boundVariables": {}
                }
              ],
              "strokeWeight": 1.3300000429153442,
              "cornerRadius": 0,
              "effects": [],
              "blendMode": "PASS_THROUGH",
              "layoutAlign": "INHERIT",
              "layoutGrow": 0,
              "children": []
            },
            {
              "id": "I126:885;13:2244;4:3499",
              "name": "Vector",
              "type": "VECTOR",
              "x": 3.3333332538604736,
              "y": 8,
              "width": 9.333333969116211,
              "height": 0,
              "relativeTransform": [
                [
                  1,
                  0,
                  3.3333332538604736
                ],
                [
                  0,
                  1,
                  8
                ]
              ],
              "constraints": {
                "horizontal": "SCALE",
                "vertical": "SCALE"
              },
              "fills": [],
              "strokes": [
                {
                  "type": "SOLID",
                  "visible": true,
                  "opacity": 1,
                  "blendMode": "NORMAL",
                  "color": {
                    "r": 1,
                    "g": 1,
                    "b": 1
                  },
                  "boundVariables": {}
                }
              ],
              "strokeWeight": 1.3300000429153442,
              "cornerRadius": 0,
              "effects": [],
              "blendMode": "PASS_THROUGH",
              "layoutAlign": "INHERIT",
              "layoutGrow": 0,
              "children": []
            }
          ]
        },
        {
          "id": "I126:885;1:95",
          "name": "Login with Email",
          "type": "TEXT",
          "x": 17.5,
          "y": 5,
          "width": 96,
          "height": 24,
          "relativeTransform": [
            [
              1,
              0,
              17.5
            ],
            [
              0,
              1,
              5
            ]
          ],
          "constraints": {
            "horizontal": "MIN",
            "vertical": "MIN"
          },
          "fills": [
            {
              "type": "SOLID",
              "visible": true,
              "opacity": 1,
              "blendMode": "NORMAL",
              "color": {
                "r": 1,
                "g": 1,
                "b": 1
              },
              "boundVariables": {}
            }
          ],
          "strokes": [],
          "strokeWeight": 1,
          "effects": [],
          "blendMode": "PASS_THROUGH",
          "layoutAlign": "INHERIT",
          "layoutGrow": 0,
          "children": []
        }
      ]
    }
  ]
}

03 drop down categorey 
fitst of all update styling using gson data below 
{
  "id": "126:899",
  "name": "select",
  "type": "FRAME",
  "x": 1740,
  "y": 1233,
  "width": 274,
  "height": 36,
  "relativeTransform": [
    [
      1,
      0,
      1740
    ],
    [
      0,
      1,
      1233
    ]
  ],
  "constraints": {
    "horizontal": "MIN",
    "vertical": "MIN"
  },
  "fills": [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 0.250980406999588,
        "g": 0.250980406999588,
        "b": 0.250980406999588
      },
      "boundVariables": {}
    }
  ],
  "strokes": [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 0.32156863808631897,
        "g": 0.32156863808631897,
        "b": 0.32156863808631897
      },
      "boundVariables": {}
    }
  ],
  "strokeWeight": 1,
  "cornerRadius": 8,
  "effects": [
    {
      "type": "DROP_SHADOW",
      "radius": 6,
      "visible": true,
      "boundVariables": {},
      "color": {
        "r": 0,
        "g": 0,
        "b": 0,
        "a": 0.09000000357627869
      },
      "offset": {
        "x": 0,
        "y": 4
      },
      "spread": 0,
      "blendMode": "NORMAL",
      "showShadowBehindNode": false
    }
  ],
  "blendMode": "PASS_THROUGH",
  "layoutAlign": "STRETCH",
  "layoutGrow": 0,
  "layoutMode": "HORIZONTAL",
  "itemSpacing": 10,
  "children": [
    {
      "id": "126:900",
      "name": "Select an option",
      "type": "TEXT",
      "x": 12,
      "y": 8,
      "width": 119,
      "height": 20,
      "relativeTransform": [
        [
          1,
          0,
          12
        ],
        [
          0,
          1,
          8
        ]
      ],
      "constraints": {
        "horizontal": "MIN",
        "vertical": "MIN"
      },
      "fills": [
        {
          "type": "SOLID",
          "visible": true,
          "opacity": 1,
          "blendMode": "NORMAL",
          "color": {
            "r": 0.886274516582489,
            "g": 0.9098039269447327,
            "b": 0.9411764740943909
          },
          "boundVariables": {}
        }
      ],
      "strokes": [],
      "strokeWeight": 1,
      "effects": [],
      "blendMode": "PASS_THROUGH",
      "layoutAlign": "INHERIT",
      "layoutGrow": 0,
      "children": []
    },
    {
      "id": "126:901",
      "name": "icon/chevron-down",
      "type": "INSTANCE",
      "x": 246,
      "y": 10,
      "width": 16,
      "height": 16,
      "relativeTransform": [
        [
          1,
          0,
          246
        ],
        [
          0,
          1,
          10
        ]
      ],
      "constraints": {
        "horizontal": "MIN",
        "vertical": "MIN"
      },
      "fills": [
        {
          "type": "SOLID",
          "visible": false,
          "opacity": 1,
          "blendMode": "NORMAL",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1
          },
          "boundVariables": {}
        }
      ],
      "strokes": [],
      "strokeWeight": 0.6666666865348816,
      "cornerRadius": 0,
      "effects": [],
      "blendMode": "PASS_THROUGH",
      "layoutAlign": "INHERIT",
      "layoutGrow": 0,
      "layoutMode": "NONE",
      "itemSpacing": 0,
      "children": [
        {
          "id": "I126:901;4:1220",
          "name": "Vector",
          "type": "VECTOR",
          "x": 4,
          "y": 6,
          "width": 8,
          "height": 4,
          "relativeTransform": [
            [
              1,
              0,
              4
            ],
            [
              0,
              1,
              6
            ]
          ],
          "constraints": {
            "horizontal": "SCALE",
            "vertical": "SCALE"
          },
          "fills": [],
          "strokes": [
            {
              "type": "SOLID",
              "visible": true,
              "opacity": 1,
              "blendMode": "NORMAL",
              "color": {
                "r": 0.8313725590705872,
                "g": 0.8313725590705872,
                "b": 0.8313725590705872
              },
              "boundVariables": {}
            }
          ],
          "strokeWeight": 1.3333333730697632,
          "cornerRadius": 0,
          "effects": [],
          "blendMode": "PASS_THROUGH",
          "layoutAlign": "INHERIT",
          "layoutGrow": 0,
          "children": []
        }
      ]
    }
  ]
}


=====================================================================================================================


03 switcher toggle control id paragraph-length-toggle
apply these JSON code from figma 
{
  "id": "126:903",
  "name": "switch",
  "type": "FRAME",
  "x": 1810,
  "y": 1452,
  "width": 171,
  "height": 24,
  "relativeTransform": [
    [
      1,
      0,
      1810
    ],
    [
      0,
      1,
      1452
    ]
  ],
  "constraints": {
    "horizontal": "MIN",
    "vertical": "MIN"
  },
  "fills": [],
  "strokes": [],
  "strokeWeight": 1,
  "cornerRadius": 0,
  "effects": [],
  "blendMode": "PASS_THROUGH",
  "layoutAlign": "INHERIT",
  "layoutGrow": 0,
  "layoutMode": "HORIZONTAL",
  "itemSpacing": 8,
  "children": [
    {
      "id": "126:904",
      "name": "toggle",
      "type": "GROUP",
      "x": 0,
      "y": 0,
      "width": 44,
      "height": 24,
      "relativeTransform": [
        [
          1,
          0,
          0
        ],
        [
          0,
          1,
          0
        ]
      ],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "radius": 6,
          "visible": true,
          "boundVariables": {},
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.09000000357627869
          },
          "offset": {
            "x": 0,
            "y": 4
          },
          "spread": 0,
          "blendMode": "NORMAL",
          "showShadowBehindNode": false
        }
      ],
      "blendMode": "PASS_THROUGH",
      "layoutAlign": "INHERIT",
      "layoutGrow": 0,
      "children": [
        {
          "id": "126:905",
          "name": "Rectangle 2",
          "type": "RECTANGLE",
          "x": 0,
          "y": 0,
          "width": 44,
          "height": 24,
          "relativeTransform": [
            [
              1,
              0,
              0
            ],
            [
              0,
              1,
              0
            ]
          ],
          "constraints": {
            "horizontal": "MIN",
            "vertical": "MIN"
          },
          "fills": [
            {
              "type": "SOLID",
              "visible": true,
              "opacity": 1,
              "blendMode": "NORMAL",
              "color": {
                "r": 0.29411765933036804,
                "g": 0.3333333432674408,
                "b": 0.38823530077934265
              },
              "boundVariables": {}
            }
          ],
          "strokes": [],
          "strokeWeight": 1,
          "cornerRadius": 50,
          "effects": [],
          "blendMode": "PASS_THROUGH",
          "layoutAlign": "INHERIT",
          "layoutGrow": 0,
          "children": []
        },
        {
          "id": "126:906",
          "name": "Ellipse 2",
          "type": "ELLIPSE",
          "x": 2,
          "y": 2,
          "width": 20,
          "height": 20,
          "relativeTransform": [
            [
              1,
              0,
              2
            ],
            [
              0,
              1,
              2
            ]
          ],
          "constraints": {
            "horizontal": "MIN",
            "vertical": "MIN"
          },
          "fills": [
            {
              "type": "SOLID",
              "visible": true,
              "opacity": 1,
              "blendMode": "NORMAL",
              "color": {
                "r": 0.8980392217636108,
                "g": 0.9058823585510254,
                "b": 0.9215686321258545
              },
              "boundVariables": {}
            }
          ],
          "strokes": [],
          "strokeWeight": 1,
          "cornerRadius": 0,
          "effects": [
            {
              "type": "DROP_SHADOW",
              "radius": 6,
              "visible": true,
              "boundVariables": {},
              "color": {
                "r": 0,
                "g": 0,
                "b": 0,
                "a": 0.09000000357627869
              },
              "offset": {
                "x": 0,
                "y": 4
              },
              "spread": 0,
              "blendMode": "NORMAL",
              "showShadowBehindNode": false
            }
          ],
          "blendMode": "PASS_THROUGH",
          "layoutAlign": "INHERIT",
          "layoutGrow": 0,
          "children": []
        }
      ]
    },
    {
      "id": "126:907",
      "name": "Label",
      "type": "TEXT",
      "x": 52,
      "y": 2,
      "width": 119,
      "height": 20,
      "relativeTransform": [
        [
          1,
          0,
          52
        ],
        [
          0,
          1,
          2
        ]
      ],
      "constraints": {
        "horizontal": "MIN",
        "vertical": "MIN"
      },
      "fills": [
        {
          "type": "SOLID",
          "visible": true,
          "opacity": 1,
          "blendMode": "NORMAL",
          "color": {
            "r": 0.8980392217636108,
            "g": 0.8980392217636108,
            "b": 0.8980392217636108
          },
          "boundVariables": {}
        }
      ],
      "strokes": [],
      "strokeWeight": 1,
      "effects": [],
      "blendMode": "PASS_THROUGH",
      "layoutAlign": "INHERIT",
      "layoutGrow": 0,
      "children": []
    }
  ]
}