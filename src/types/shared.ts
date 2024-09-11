import React from "react";
// src/types.d.ts
import { CSSProperties } from "react";

export interface CustomCSSProperties extends CSSProperties {
  "--image-url"?: string;
  "--hover-bg"?: string;
  "--hover-border"?: string;
  "--bg-img"?: string;
  "--bg-hover-img"?: string;
}

export type TChildren = {
  children: React.ReactNode;
};

export type TBlog = {
  id: string;
  image1: string;
  description: string;
  title: string;
  read_time: string | number;
  created: string;
  author: string;
  image2: string | null;
  image3: string | null;
  is_archived: boolean;
  is_drafted: boolean;
  slug: string;
  updated_at: string;
};

export type TStockCardProgressBar = {
  width: string | number;
  marginLeft: number;
  marginRight: number;
  className?: string;
};

export type TStockCardProgressBarSolid = TStockCardProgressBar & { currentProgress: number;scaleVariant?:boolean };


export type TTarget = {
  status: string;
  date: string;
  price: number;
  label:string;
};