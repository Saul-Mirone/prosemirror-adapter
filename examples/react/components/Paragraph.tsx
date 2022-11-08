/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { nodeViewContext } from '@prosemirror-adapter/react';
import { useContext } from 'react';

export const Paragraph = () => {
    const { contentRef, selected } = useContext(nodeViewContext);
    return <div style={{ outline: selected ? 'blue solid 1px' : 'none' }} role="presentation" ref={contentRef} />;
};
