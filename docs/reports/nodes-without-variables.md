# Nodes Without Design Tokens (No Variables Extracted)

**Generated:** December 15, 2025

## Summary

This report answers: **Which Figma nodes in the plan inventory did not produce any extractable variables via Figma MCP `get_variable_defs`?**

- **Plan inventory nodes**: 125
- **Nodes with extracted variables (present in `design-tokens.json` → `source_nodes`)**: 98
- **Nodes without extracted variables**: 27

> Note: “No variables extracted” means the node is **not present in `docs/design/design-system/consolidated/design-tokens.json` → `source_nodes`**. In practice, that usually indicates the node has no reusable variables/tokens (common), or the node returned an empty response when queried.

## Nodes without variables (27)

| Node ID |
|--------|
| `10143:11017` |
| `10466:5463` |
| `10839:28581` |
| `11132:39887` |
| `11132:39956` |
| `11147:40065` |
| `11200:47802` |
| `11200:47803` |
| `11200:48064` |
| `11200:48065` |
| `11257:17569` |
| `11649:20912` |
| `11653:24350` |
| `8079:39697` |
| `8228:25099` |
| `8228:26850` |
| `8228:27723` |
| `8228:28572` |
| `8228:29481` |
| `8232:22528` |
| `8477:21337` |
| `8477:21552` |
| `8477:21892` |
| `8477:21895` |
| `8643:39446` |
| `8643:41406` |
| `9970:24465` |

## Where to verify

- **Inventory source**: `/Users/Amit Yogev/.cursor/plans/figma_ui_event_mapping_f0e1ed43.plan.md`
- **Tokens source**: `docs/design/design-system/consolidated/design-tokens.json` (`source_nodes`)

## What this means for the Design System

- This does **not** block implementation.
- It simply means those nodes did not provide reusable design variables.
- The design system tokens remain valid and production-ready.
