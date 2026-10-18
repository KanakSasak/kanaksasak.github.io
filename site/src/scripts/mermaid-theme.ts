import type { MermaidConfig } from 'mermaid';

/** A flat research-notebook palette paired with the site's two color modes. */
export function researchDiagramTheme(dark: boolean): MermaidConfig {
  const colors = dark
    ? {paper:'#20251d',ink:'#efeee7',node:'#283544',border:'#99adc2',pink:'#51323e',pinkBorder:'#f28fb7',lime:'#d8fb6b',limeInk:'#20251a',line:'#b9c5a9',cluster:'#252a21'}
    : {paper:'#efefe8',ink:'#1d1d1b',node:'#dce5f0',border:'#54677e',pink:'#ecc4d1',pinkBorder:'#96516d',lime:'#d8fb6b',limeInk:'#20251a',line:'#56634c',cluster:'#e6e9df'};
  return {
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    look: 'classic',
    htmlLabels: false,
    fontFamily: 'IBM Plex Mono, monospace',
    themeVariables: {
      darkMode: dark,
      background: colors.paper,
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: '14px',
      primaryColor: colors.node,
      primaryTextColor: colors.ink,
      primaryBorderColor: colors.border,
      secondaryColor: colors.pink,
      secondaryTextColor: colors.ink,
      secondaryBorderColor: colors.pinkBorder,
      tertiaryColor: colors.cluster,
      tertiaryTextColor: colors.ink,
      tertiaryBorderColor: colors.border,
      textColor: colors.ink,
      mainBkg: colors.node,
      nodeBorder: colors.border,
      nodeTextColor: colors.ink,
      lineColor: colors.line,
      defaultLinkColor: colors.line,
      edgeLabelBackground: colors.paper,
      clusterBkg: colors.cluster,
      clusterBorder: colors.border,
      titleColor: colors.ink,
      noteBkgColor: colors.pink,
      noteTextColor: colors.ink,
      noteBorderColor: colors.pinkBorder,
      actorBkg: colors.node,
      actorBorder: colors.border,
      actorTextColor: colors.ink,
      actorLineColor: colors.line,
      signalColor: colors.line,
      signalTextColor: colors.ink,
      labelBoxBkgColor: colors.paper,
      labelBoxBorderColor: colors.border,
      labelTextColor: colors.ink,
      loopTextColor: colors.ink,
      activationBkgColor: colors.pink,
      activationBorderColor: colors.pinkBorder,
      sequenceNumberColor: colors.limeInk,
      pie1: colors.node,
      pie2: colors.pink,
      pie3: colors.lime,
      pieStrokeColor: colors.border,
      pieSectionTextColor: colors.limeInk,
    },
    // Optional semantic classes keep meaning and contrast consistent in both modes.
    themeCSS: `
      .nodeLabel p, .edgeLabel p { color: ${colors.ink}; }
      .node.decision polygon, .node.decision path, .node.decision rect {
        fill: ${colors.pink}; stroke: ${colors.pinkBorder};
      }
      .node.finding rect, .node.finding path, .node.finding polygon {
        fill: ${colors.lime}; stroke: ${colors.limeInk};
      }
      .node.finding .nodeLabel, .node.finding .nodeLabel p, .node.finding text, .node.finding tspan {
        fill: ${colors.limeInk}; color: ${colors.limeInk};
      }
      .edgeLabel rect { opacity: 1; }
    `,
    flowchart: {htmlLabels: false, useMaxWidth: true, curve: 'linear', nodeSpacing: 35, rankSpacing: 38},
  };
}
