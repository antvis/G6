---
title: "ForceAtlas2 Force-directed Layout"
description: "ForceAtlas2 Force-directed Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/layout/ForceAtlas2Layout/"
version: "5.1.1"
---

## Overview

ForceAtlas2 is a force-directed layout algorithm that optimizes node positions by simulating forces in a physical system. This layout is especially suitable for visualizing large-scale network data, effectively revealing relationships and cluster structures among nodes.

## Use Cases

- Social network analysis: Display user relationship networks, with node degree reflecting user influence
- Knowledge graphs: Show associations between concepts, discover knowledge domains through clustering
- System architecture diagrams: Show dependencies between system components, highlight core components via hub mode

## Online Demo



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'Myriel' },
        { id: 'Napoleon' },
        { id: 'Mlle.Baptistine' },
        { id: 'Mme.Magloire' },
        { id: 'CountessdeLo' },
        { id: 'Geborand' },
        { id: 'Champtercier' },
        { id: 'Cravatte' },
        { id: 'Count' },
        { id: 'OldMan' },
        { id: 'Labarre' },
        { id: 'Valjean' },
        { id: 'Marguerite' },
        { id: 'Mme.deR' },
        { id: 'Isabeau' },
        { id: 'Gervais' },
        { id: 'Tholomyes' },
        { id: 'Listolier' },
        { id: 'Fameuil' },
        { id: 'Blacheville' },
        { id: 'Favourite' },
        { id: 'Dahlia' },
        { id: 'Zephine' },
        { id: 'Fantine' },
        { id: 'Mme.Thenardier' },
        { id: 'Thenardier' },
        { id: 'Cosette' },
        { id: 'Javert' },
        { id: 'Fauchelevent' },
        { id: 'Bamatabois' },
        { id: 'Perpetue' },
        { id: 'Simplice' },
        { id: 'Scaufflaire' },
        { id: 'Woman1' },
        { id: 'Judge' },
        { id: 'Champmathieu' },
        { id: 'Brevet' },
        { id: 'Chenildieu' },
        { id: 'Cochepaille' },
        { id: 'Pontmercy' },
        { id: 'Boulatruelle' },
        { id: 'Eponine' },
        { id: 'Anzelma' },
        { id: 'Woman2' },
        { id: 'MotherInnocent' },
        { id: 'Gribier' },
        { id: 'Jondrette' },
        { id: 'Mme.Burgon' },
        { id: 'Gavroche' },
        { id: 'Gillenormand' },
        { id: 'Magnon' },
        { id: 'Mlle.Gillenormand' },
        { id: 'Mme.Pontmercy' },
        { id: 'Mlle.Vaubois' },
        { id: 'Lt.Gillenormand' },
        { id: 'Marius' },
        { id: 'BaronessT' },
        { id: 'Mabeuf' },
        { id: 'Enjolras' },
        { id: 'Combeferre' },
        { id: 'Prouvaire' },
        { id: 'Feuilly' },
        { id: 'Courfeyrac' },
        { id: 'Bahorel' },
        { id: 'Bossuet' },
        { id: 'Joly' },
        { id: 'Grantaire' },
        { id: 'MotherPlutarch' },
        { id: 'Gueulemer' },
        { id: 'Babet' },
        { id: 'Claquesous' },
        { id: 'Montparnasse' },
        { id: 'Toussaint' },
        { id: 'Child1' },
        { id: 'Child2' },
        { id: 'Brujon' },
        { id: 'Mme.Hucheloup' },
      ],
      edges: [
        { source: 'Napoleon', target: 'Myriel', value: 1 },
        { source: 'Mlle.Baptistine', target: 'Myriel', value: 8 },
        { source: 'Mme.Magloire', target: 'Myriel', value: 10 },
        { source: 'Mme.Magloire', target: 'Mlle.Baptistine', value: 6 },
        { source: 'CountessdeLo', target: 'Myriel', value: 1 },
        { source: 'Geborand', target: 'Myriel', value: 1 },
        { source: 'Champtercier', target: 'Myriel', value: 1 },
        { source: 'Cravatte', target: 'Myriel', value: 1 },
        { source: 'Count', target: 'Myriel', value: 2 },
        { source: 'OldMan', target: 'Myriel', value: 1 },
        { source: 'Valjean', target: 'Labarre', value: 1 },
        { source: 'Valjean', target: 'Mme.Magloire', value: 3 },
        { source: 'Valjean', target: 'Mlle.Baptistine', value: 3 },
        { source: 'Valjean', target: 'Myriel', value: 5 },
        { source: 'Marguerite', target: 'Valjean', value: 1 },
        { source: 'Mme.deR', target: 'Valjean', value: 1 },
        { source: 'Isabeau', target: 'Valjean', value: 1 },
        { source: 'Gervais', target: 'Valjean', value: 1 },
        { source: 'Listolier', target: 'Tholomyes', value: 4 },
        { source: 'Fameuil', target: 'Tholomyes', value: 4 },
        { source: 'Fameuil', target: 'Listolier', value: 4 },
        { source: 'Blacheville', target: 'Tholomyes', value: 4 },
        { source: 'Blacheville', target: 'Listolier', value: 4 },
        { source: 'Blacheville', target: 'Fameuil', value: 4 },
        { source: 'Favourite', target: 'Tholomyes', value: 3 },
        { source: 'Favourite', target: 'Listolier', value: 3 },
        { source: 'Favourite', target: 'Fameuil', value: 3 },
        { source: 'Favourite', target: 'Blacheville', value: 4 },
        { source: 'Dahlia', target: 'Tholomyes', value: 3 },
        { source: 'Dahlia', target: 'Listolier', value: 3 },
        { source: 'Dahlia', target: 'Fameuil', value: 3 },
        { source: 'Dahlia', target: 'Blacheville', value: 3 },
        { source: 'Dahlia', target: 'Favourite', value: 5 },
        { source: 'Zephine', target: 'Tholomyes', value: 3 },
        { source: 'Zephine', target: 'Listolier', value: 3 },
        { source: 'Zephine', target: 'Fameuil', value: 3 },
        { source: 'Zephine', target: 'Blacheville', value: 3 },
        { source: 'Zephine', target: 'Favourite', value: 4 },
        { source: 'Zephine', target: 'Dahlia', value: 4 },
        { source: 'Fantine', target: 'Tholomyes', value: 3 },
        { source: 'Fantine', target: 'Listolier', value: 3 },
        { source: 'Fantine', target: 'Fameuil', value: 3 },
        { source: 'Fantine', target: 'Blacheville', value: 3 },
        { source: 'Fantine', target: 'Favourite', value: 4 },
        { source: 'Fantine', target: 'Dahlia', value: 4 },
        { source: 'Fantine', target: 'Zephine', value: 4 },
        { source: 'Fantine', target: 'Marguerite', value: 2 },
        { source: 'Fantine', target: 'Valjean', value: 9 },
        { source: 'Mme.Thenardier', target: 'Fantine', value: 2 },
        { source: 'Mme.Thenardier', target: 'Valjean', value: 7 },
        { source: 'Thenardier', target: 'Mme.Thenardier', value: 13 },
        { source: 'Thenardier', target: 'Fantine', value: 1 },
        { source: 'Thenardier', target: 'Valjean', value: 12 },
        { source: 'Cosette', target: 'Mme.Thenardier', value: 4 },
        { source: 'Cosette', target: 'Valjean', value: 31 },
        { source: 'Cosette', target: 'Tholomyes', value: 1 },
        { source: 'Cosette', target: 'Thenardier', value: 1 },
        { source: 'Javert', target: 'Valjean', value: 17 },
        { source: 'Javert', target: 'Fantine', value: 5 },
        { source: 'Javert', target: 'Thenardier', value: 5 },
        { source: 'Javert', target: 'Mme.Thenardier', value: 1 },
        { source: 'Javert', target: 'Cosette', value: 1 },
        { source: 'Fauchelevent', target: 'Valjean', value: 8 },
        { source: 'Fauchelevent', target: 'Javert', value: 1 },
        { source: 'Bamatabois', target: 'Fantine', value: 1 },
        { source: 'Bamatabois', target: 'Javert', value: 1 },
        { source: 'Bamatabois', target: 'Valjean', value: 2 },
        { source: 'Perpetue', target: 'Fantine', value: 1 },
        { source: 'Simplice', target: 'Perpetue', value: 2 },
        { source: 'Simplice', target: 'Valjean', value: 3 },
        { source: 'Simplice', target: 'Fantine', value: 2 },
        { source: 'Simplice', target: 'Javert', value: 1 },
        { source: 'Scaufflaire', target: 'Valjean', value: 1 },
        { source: 'Woman1', target: 'Valjean', value: 2 },
        { source: 'Woman1', target: 'Javert', value: 1 },
        { source: 'Judge', target: 'Valjean', value: 3 },
        { source: 'Judge', target: 'Bamatabois', value: 2 },
        { source: 'Champmathieu', target: 'Valjean', value: 3 },
        { source: 'Champmathieu', target: 'Judge', value: 3 },
        { source: 'Champmathieu', target: 'Bamatabois', value: 2 },
        { source: 'Brevet', target: 'Judge', value: 2 },
        { source: 'Brevet', target: 'Champmathieu', value: 2 },
        { source: 'Brevet', target: 'Valjean', value: 2 },
        { source: 'Brevet', target: 'Bamatabois', value: 1 },
        { source: 'Chenildieu', target: 'Judge', value: 2 },
        { source: 'Chenildieu', target: 'Champmathieu', value: 2 },
        { source: 'Chenildieu', target: 'Brevet', value: 2 },
        { source: 'Chenildieu', target: 'Valjean', value: 2 },
        { source: 'Chenildieu', target: 'Bamatabois', value: 1 },
        { source: 'Cochepaille', target: 'Judge', value: 2 },
        { source: 'Cochepaille', target: 'Champmathieu', value: 2 },
        { source: 'Cochepaille', target: 'Brevet', value: 2 },
        { source: 'Cochepaille', target: 'Chenildieu', value: 2 },
        { source: 'Cochepaille', target: 'Valjean', value: 2 },
        { source: 'Cochepaille', target: 'Bamatabois', value: 1 },
        { source: 'Pontmercy', target: 'Thenardier', value: 1 },
        { source: 'Boulatruelle', target: 'Thenardier', value: 1 },
        { source: 'Eponine', target: 'Mme.Thenardier', value: 5 },
        { source: 'Eponine', target: 'Thenardier', value: 1 },
        { source: 'Anzelma', target: 'Eponine', value: 1 },
        { source: 'Anzelma', target: 'Thenardier', value: 1 },
        { source: 'Anzelma', target: 'Mme.Thenardier', value: 1 },
        { source: 'Woman2', target: 'Valjean', value: 3 },
        { source: 'Woman2', target: 'Cosette', value: 1 },
        { source: 'Woman2', target: 'Javert', value: 1 },
        { source: 'MotherInnocent', target: 'Fauchelevent', value: 3 },
        { source: 'MotherInnocent', target: 'Valjean', value: 1 },
        { source: 'Gribier', target: 'Fauchelevent', value: 2 },
        { source: 'Mme.Burgon', target: 'Jondrette', value: 1 },
        { source: 'Jondrette', target: 'Mme.Burgon', value: 2 },
        { source: 'Jondrette', target: 'Valjean', value: 1 },
        { source: 'Gavroche', target: 'Mme.Burgon', value: 2 },
        { source: 'Gavroche', target: 'Thenardier', value: 1 },
        { source: 'Gavroche', target: 'Javert', value: 1 },
        { source: 'Gavroche', target: 'Valjean', value: 2 },
        { source: 'Gillenormand', target: 'Cosette', value: 3 },
        { source: 'Gillenormand', target: 'Valjean', value: 2 },
        { source: 'Magnon', target: 'Gillenormand', value: 1 },
        { source: 'Magnon', target: 'Mme.Thenardier', value: 1 },
        { source: 'Mlle.Gillenormand', target: 'Gillenormand', value: 9 },
        { source: 'Mlle.Gillenormand', target: 'Cosette', value: 2 },
        { source: 'Mlle.Gillenormand', target: 'Valjean', value: 2 },
        { source: 'Mme.Pontmercy', target: 'Mlle.Gillenormand', value: 1 },
        { source: 'Mme.Pontmercy', target: 'Pontmercy', value: 1 },
        { source: 'Mlle.Vaubois', target: 'Mlle.Gillenormand', value: 1 },
        { source: 'Lt.Gillenormand', target: 'Mlle.Gillenormand', value: 2 },
        { source: 'Lt.Gillenormand', target: 'Gillenormand', value: 1 },
        { source: 'Lt.Gillenormand', target: 'Cosette', value: 1 },
        { source: 'Marius', target: 'Mlle.Gillenormand', value: 6 },
        { source: 'Marius', target: 'Gillenormand', value: 12 },
        { source: 'Marius', target: 'Pontmercy', value: 1 },
        { source: 'Marius', target: 'Lt.Gillenormand', value: 1 },
        { source: 'Marius', target: 'Cosette', value: 21 },
        { source: 'Marius', target: 'Valjean', value: 19 },
        { source: 'Marius', target: 'Tholomyes', value: 1 },
        { source: 'Marius', target: 'Thenardier', value: 2 },
        { source: 'Marius', target: 'Eponine', value: 5 },
        { source: 'Marius', target: 'Gavroche', value: 4 },
        { source: 'BaronessT', target: 'Gillenormand', value: 1 },
        { source: 'BaronessT', target: 'Marius', value: 1 },
        { source: 'Mabeuf', target: 'Marius', value: 1 },
        { source: 'Mabeuf', target: 'Eponine', value: 1 },
        { source: 'Mabeuf', target: 'Gavroche', value: 1 },
        { source: 'Enjolras', target: 'Marius', value: 7 },
        { source: 'Enjolras', target: 'Gavroche', value: 7 },
        { source: 'Enjolras', target: 'Javert', value: 6 },
        { source: 'Enjolras', target: 'Mabeuf', value: 1 },
        { source: 'Enjolras', target: 'Valjean', value: 4 },
        { source: 'Combeferre', target: 'Enjolras', value: 15 },
        { source: 'Combeferre', target: 'Marius', value: 5 },
        { source: 'Combeferre', target: 'Gavroche', value: 6 },
        { source: 'Combeferre', target: 'Mabeuf', value: 2 },
        { source: 'Prouvaire', target: 'Gavroche', value: 1 },
        { source: 'Prouvaire', target: 'Enjolras', value: 4 },
        { source: 'Prouvaire', target: 'Combeferre', value: 2 },
        { source: 'Feuilly', target: 'Gavroche', value: 2 },
        { source: 'Feuilly', target: 'Enjolras', value: 6 },
        { source: 'Feuilly', target: 'Prouvaire', value: 2 },
        { source: 'Feuilly', target: 'Combeferre', value: 5 },
        { source: 'Feuilly', target: 'Mabeuf', value: 1 },
        { source: 'Feuilly', target: 'Marius', value: 1 },
        { source: 'Courfeyrac', target: 'Marius', value: 9 },
        { source: 'Courfeyrac', target: 'Enjolras', value: 17 },
        { source: 'Courfeyrac', target: 'Combeferre', value: 13 },
        { source: 'Courfeyrac', target: 'Gavroche', value: 7 },
        { source: 'Courfeyrac', target: 'Mabeuf', value: 2 },
        { source: 'Courfeyrac', target: 'Eponine', value: 1 },
        { source: 'Courfeyrac', target: 'Feuilly', value: 6 },
        { source: 'Courfeyrac', target: 'Prouvaire', value: 3 },
        { source: 'Bahorel', target: 'Combeferre', value: 5 },
        { source: 'Bahorel', target: 'Gavroche', value: 5 },
        { source: 'Bahorel', target: 'Courfeyrac', value: 6 },
        { source: 'Bahorel', target: 'Mabeuf', value: 2 },
        { source: 'Bahorel', target: 'Enjolras', value: 4 },
        { source: 'Bahorel', target: 'Feuilly', value: 3 },
        { source: 'Bahorel', target: 'Prouvaire', value: 2 },
        { source: 'Bahorel', target: 'Marius', value: 1 },
        { source: 'Bossuet', target: 'Marius', value: 5 },
        { source: 'Bossuet', target: 'Courfeyrac', value: 12 },
        { source: 'Bossuet', target: 'Gavroche', value: 5 },
        { source: 'Bossuet', target: 'Bahorel', value: 4 },
        { source: 'Bossuet', target: 'Enjolras', value: 10 },
        { source: 'Bossuet', target: 'Feuilly', value: 6 },
        { source: 'Bossuet', target: 'Prouvaire', value: 2 },
        { source: 'Bossuet', target: 'Combeferre', value: 9 },
        { source: 'Bossuet', target: 'Mabeuf', value: 1 },
        { source: 'Bossuet', target: 'Valjean', value: 1 },
        { source: 'Joly', target: 'Bahorel', value: 5 },
        { source: 'Joly', target: 'Bossuet', value: 7 },
        { source: 'Joly', target: 'Gavroche', value: 3 },
        { source: 'Joly', target: 'Courfeyrac', value: 5 },
        { source: 'Joly', target: 'Enjolras', value: 5 },
        { source: 'Joly', target: 'Feuilly', value: 5 },
        { source: 'Joly', target: 'Prouvaire', value: 2 },
        { source: 'Joly', target: 'Combeferre', value: 5 },
        { source: 'Joly', target: 'Mabeuf', value: 1 },
        { source: 'Joly', target: 'Marius', value: 2 },
        { source: 'Grantaire', target: 'Bossuet', value: 3 },
        { source: 'Grantaire', target: 'Enjolras', value: 3 },
        { source: 'Grantaire', target: 'Combeferre', value: 1 },
        { source: 'Grantaire', target: 'Courfeyrac', value: 2 },
        { source: 'Grantaire', target: 'Joly', value: 2 },
        { source: 'Grantaire', target: 'Gavroche', value: 1 },
        { source: 'Grantaire', target: 'Bahorel', value: 1 },
        { source: 'Grantaire', target: 'Feuilly', value: 1 },
        { source: 'Grantaire', target: 'Prouvaire', value: 1 },
        { source: 'MotherPlutarch', target: 'Mabeuf', value: 3 },
        { source: 'Gueulemer', target: 'Thenardier', value: 5 },
        { source: 'Gueulemer', target: 'Valjean', value: 1 },
        { source: 'Gueulemer', target: 'Mme.Thenardier', value: 1 },
        { source: 'Gueulemer', target: 'Javert', value: 1 },
        { source: 'Gueulemer', target: 'Gavroche', value: 1 },
        { source: 'Gueulemer', target: 'Eponine', value: 1 },
        { source: 'Babet', target: 'Thenardier', value: 6 },
        { source: 'Babet', target: 'Gueulemer', value: 6 },
        { source: 'Babet', target: 'Valjean', value: 1 },
        { source: 'Babet', target: 'Mme.Thenardier', value: 1 },
        { source: 'Babet', target: 'Javert', value: 2 },
        { source: 'Babet', target: 'Gavroche', value: 1 },
        { source: 'Babet', target: 'Eponine', value: 1 },
        { source: 'Claquesous', target: 'Thenardier', value: 4 },
        { source: 'Claquesous', target: 'Babet', value: 4 },
        { source: 'Claquesous', target: 'Gueulemer', value: 4 },
        { source: 'Claquesous', target: 'Valjean', value: 1 },
        { source: 'Claquesous', target: 'Mme.Thenardier', value: 1 },
        { source: 'Claquesous', target: 'Javert', value: 1 },
        { source: 'Claquesous', target: 'Eponine', value: 1 },
        { source: 'Claquesous', target: 'Enjolras', value: 1 },
        { source: 'Montparnasse', target: 'Javert', value: 1 },
        { source: 'Montparnasse', target: 'Babet', value: 2 },
        { source: 'Montparnasse', target: 'Gueulemer', value: 2 },
        { source: 'Montparnasse', target: 'Claquesous', value: 2 },
        { source: 'Montparnasse', target: 'Valjean', value: 1 },
        { source: 'Montparnasse', target: 'Gavroche', value: 1 },
        { source: 'Montparnasse', target: 'Eponine', value: 1 },
        { source: 'Montparnasse', target: 'Thenardier', value: 1 },
        { source: 'Toussaint', target: 'Cosette', value: 2 },
        { source: 'Toussaint', target: 'Javert', value: 1 },
        { source: 'Toussaint', target: 'Valjean', value: 1 },
        { source: 'Child1', target: 'Gavroche', value: 2 },
        { source: 'Child2', target: 'Gavroche', value: 2 },
        { source: 'Child2', target: 'Child1', value: 3 },
        { source: 'Brujon', target: 'Babet', value: 3 },
        { source: 'Brujon', target: 'Gueulemer', value: 3 },
        { source: 'Brujon', target: 'Thenardier', value: 3 },
        { source: 'Brujon', target: 'Gavroche', value: 1 },
        { source: 'Brujon', target: 'Eponine', value: 1 },
        { source: 'Brujon', target: 'Claquesous', value: 1 },
        { source: 'Brujon', target: 'Montparnasse', value: 1 },
        { source: 'Mme.Hucheloup', target: 'Bossuet', value: 1 },
        { source: 'Mme.Hucheloup', target: 'Joly', value: 1 },
        { source: 'Mme.Hucheloup', target: 'Grantaire', value: 1 },
        { source: 'Mme.Hucheloup', target: 'Bahorel', value: 1 },
        { source: 'Mme.Hucheloup', target: 'Courfeyrac', value: 1 },
        { source: 'Mme.Hucheloup', target: 'Gavroche', value: 1 },
        { source: 'Mme.Hucheloup', target: 'Enjolras', value: 1 },
      ],
    },
    autoFit: 'view',
    layout: {
      type: 'force-atlas2',
      preventOverlap: true,
      kr: 20,
      center: [250, 250],
      ks: 0.1,
      ksmax: 10,
      tao: 0.1,
      mode: 'normal',
    },
    behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
    autoResize: true,
    zoomRange: [0.1, 5],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      type: 'force-atlas2',
      preventOverlap: true,
      kr: 20,
      ks: 0.1,
      ksmax: 10,
      tao: 0.1,
      mode: 'normal',
      kg: 1,
      barnesHut: false,
      dissuadeHubs: false,
      prune: false,
    };

    const optionFolder = gui.addFolder('ForceAtlas2 Layout Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'preventOverlap');
    optionFolder.add(options, 'kr', 1, 100, 1);
    optionFolder.add(options, 'ks', 0.01, 1, 0.01);
    optionFolder.add(options, 'ksmax', 1, 20, 1);
    optionFolder.add(options, 'tao', 0.01, 1, 0.01);
    optionFolder.add(options, 'kg', 0, 10, 0.1);
    optionFolder.add(options, 'barnesHut');
    optionFolder.add(options, 'dissuadeHubs');
    optionFolder.add(options, 'prune');
    optionFolder.add(options, 'mode', ['normal', 'linlog']);

    optionFolder.onChange(async ({ property, value }) => {
      graph.setLayout(
        Object.assign({}, graph.getLayout(), {
          [property]: value,
        }),
      );
      await graph.layout();
    });
  },
);
```



## Basic Usage

```js
const graph = new Graph({
  layout: {
    type: 'force-atlas2',
    preventOverlap: true,
    kr: 20,
    center: [250, 250],
  },
});
```

## Options

| Property       | Description                                                                                                                                                                   | Type                                | Default  | Required |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | -------- | -------- |
| type           | Layout type, must be `force-atlas2`                                                                                                                                           | `force-atlas2`                      | -        | ✓        |
| maxIteration   | Maximum number of iterations                                                                                                                                                  | number                              | 500      |          |
| minMovement    | Convergence threshold                                                                                                                                                         | number                              | 0.4      |          |
| barnesHut      | Whether to enable quadtree acceleration. When enabled, improves performance for large graphs but may affect layout quality. By default, enabled if node count > 250.          | boolean                             | -        |          |
| dissuadeHubs   | Whether to enable hub mode. If true, nodes with higher in-degree are more likely to be placed at the center than those with high out-degree                                   | boolean                             | false    |          |
| height         | Layout height. Defaults to container height                                                                                                                                   | number                              | -        |          |
| kg             | Gravity coefficient. The larger the value, the more concentrated the layout is at the center                                                                                  | number                              | 1        |          |
| kr             | Repulsion coefficient. Adjusts the compactness of the layout. The larger the value, the looser the layout                                                                     | number                              | 5        |          |
| ks             | Controls the speed of node movement during iteration                                                                                                                          | number                              | 0.1      |          |
| ksmax          | Maximum node movement speed during iteration                                                                                                                                  | number                              | 10       |          |
| mode           | Clustering mode. In `linlog` mode, clusters are more compact                                                                                                                  | `normal` \| `linlog`                | `normal` |          |
| nodeSize       | Node size (diameter). Used for repulsion calculation when `preventOverlap` is enabled. If not set, uses `data.size` in node data                                              | Size \| ((node?: Node) => Size)     | -        |          |
| nodeSpacing    | Spacing between nodes                                                                                                                                                         | number \| ((node?: Node) => number) | -        |          |
| onTick         | Callback for each iteration                                                                                                                                                   | (data: LayoutMapping) => void       | -        |          |
| preventOverlap | Whether to prevent node overlap. When enabled, layout considers node size to avoid overlap. Node size is specified by `nodeSize` or `data.size` in node data                  | boolean                             | false    |          |
| prune          | Whether to enable auto-pruning. By default, enabled if node count > 100. Pruning speeds up convergence but may reduce layout quality. Set to false to disable auto-activation | boolean                             | -        |          |
| tao            | Tolerance for stopping oscillation when layout is near convergence                                                                                                            | number                              | 0.1      |          |
| width          | Layout width. Defaults to container width                                                                                                                                     | number                              | -        |          |
| center         | Layout center, format [x, y]. Each node is attracted to this point, gravity controlled by `kg`. If not set, uses canvas center                                                | [number, number]                    | -        |          |

## Code Example

### Basic Usage

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  layout: {
    type: 'force-atlas2',
    preventOverlap: true,
    kr: 20,
  },
  autoFit: 'view',
  data: {
    nodes: [
      { id: 'node1' },
      { id: 'node2' },
      { id: 'node3' },
      { id: 'node4' },
      { id: 'node5' },
      { id: 'node6' },
      { id: 'node7' },
      { id: 'node8' },
      { id: 'node9' },
      { id: 'node10' },
      { id: 'node11' },
      { id: 'node12' },
      { id: 'node13' },
      { id: 'node14' },
      { id: 'node15' },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
      { source: 'node5', target: 'node6' },
      { source: 'node6', target: 'node7' },
      { source: 'node7', target: 'node8' },
      { source: 'node8', target: 'node9' },
      { source: 'node9', target: 'node10' },
      { source: 'node10', target: 'node11' },
      { source: 'node11', target: 'node12' },
      { source: 'node12', target: 'node13' },
      { source: 'node13', target: 'node14' },
      { source: 'node14', target: 'node15' },
      { source: 'node15', target: 'node1' },
      { source: 'node1', target: 'node8' },
      { source: 'node2', target: 'node9' },
      { source: 'node3', target: 'node10' },
      { source: 'node4', target: 'node11' },
      { source: 'node5', target: 'node12' },
      { source: 'node6', target: 'node13' },
      { source: 'node7', target: 'node14' },
    ],
  },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
});
```

Result:



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 300,
  layout: {
    type: 'force-atlas2',
    preventOverlap: true,
    kr: 20,
  },
  data: {
    nodes: [
      { id: 'node1' },
      { id: 'node2' },
      { id: 'node3' },
      { id: 'node4' },
      { id: 'node5' },
      { id: 'node6' },
      { id: 'node7' },
      { id: 'node8' },
      { id: 'node9' },
      { id: 'node10' },
      { id: 'node11' },
      { id: 'node12' },
      { id: 'node13' },
      { id: 'node14' },
      { id: 'node15' },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
      { source: 'node5', target: 'node6' },
      { source: 'node6', target: 'node7' },
      { source: 'node7', target: 'node8' },
      { source: 'node8', target: 'node9' },
      { source: 'node9', target: 'node10' },
      { source: 'node10', target: 'node11' },
      { source: 'node11', target: 'node12' },
      { source: 'node12', target: 'node13' },
      { source: 'node13', target: 'node14' },
      { source: 'node14', target: 'node15' },
      { source: 'node15', target: 'node1' },
      { source: 'node1', target: 'node8' },
      { source: 'node2', target: 'node9' },
      { source: 'node3', target: 'node10' },
      { source: 'node4', target: 'node11' },
      { source: 'node5', target: 'node12' },
      { source: 'node6', target: 'node13' },
      { source: 'node7', target: 'node14' },
    ],
  },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
});

graph.render();
```


## Real Example



```ts

import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      layout: {
        type: 'force-atlas2',
        preventOverlap: true,
        kr: 20,
        center: [250, 250],
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
      autoResize: true,
      zoomRange: [0.1, 5],
    });

    graph.render();
  });
```


- [ForceAtlas2 Layout](/en/examples/layout/force-directed/atlas2/)
### demo-runtime.ts

```ts
import { Graph } from '@antv/g6';
import GUI from 'lil-gui';

export function addPanel(renderPanel: (gui: GUI) => void) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

export async function createGraph(
  options: ConstructorParameters<typeof Graph>[0],
  size: { width?: number; height?: number } = {},
  renderPanel?: (gui: GUI, graph: Graph) => void,
) {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '100%',
    maxWidth: `${size.width || 600}px`,
    height: `${size.height || 400}px`,
  });
  document.getElementById('container')!.append(container);
  const graph = new Graph({ ...size, ...options, width: container.clientWidth, container, autoResize: true });
  addEventListener('pagehide', () => graph.destroy(), { once: true });
  await graph.render();
  if (renderPanel) addPanel((gui) => renderPanel(gui, graph));
  return container;
}
```
