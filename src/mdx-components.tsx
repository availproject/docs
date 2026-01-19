import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  Tabs,
  Tab,
  Cards,
  Card,
  Callout,
  Steps,
  Step,
  FileIcon,
  GithubIcon24,
  LinkIcon,
  LoaderPinwheelIcon,
  YouTube,
} from '@/components/nextra-compat';

// Custom components for Avail docs
const customComponents = {
  Tabs,
  Tab,
  Cards,
  Card,
  Callout,
  Steps,
  Step,
  FileIcon,
  GithubIcon24,
  LinkIcon,
  LoaderPinwheelIcon,
  YouTube,
};

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...customComponents,
    ...components,
  };
}
