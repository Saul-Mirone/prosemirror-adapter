/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { nodeViewContext } from '@prosemirror-adapter/react';
import { useContext } from 'react';

export const Heading = () => {
    const { contentRef, node } = useContext(nodeViewContext);
    const Tag = `h${node.attrs['level']}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    return <Tag ref={contentRef} />;
};
