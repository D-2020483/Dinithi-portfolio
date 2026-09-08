import { cvIconData } from "./cvIconData.js"

export async function iconPng(name) {
  return cvIconData[name] || ""
}
