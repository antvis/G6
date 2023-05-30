import {
  ForceLayout,
  FruchtermanLayout,
  initThreads,
  supportsThreads,
} from '@antv/layout-wasm';
import G6 from '../../../src/index';
import { IBadgePosition } from '../../../src/types/item';
import { container, width } from '../../datasets/const';
const data = {
  nodes: [
    { id: 'Myriel', data: { x: 122.619579008568, y: -121.31805520154471 } },
    { id: 'Napoleon', data: { x: 117.63437280462881, y: -212.32604161416586 } },
    {
      id: 'Mlle.Baptistine',
      data: { x: 89.03017497635965, y: -19.303142652308885 },
    },
    {
      id: 'Mme.Magloire',
      data: { x: 134.5139431508776, y: -29.235241173886394 },
    },
    {
      id: 'CountessdeLo',
      data: { x: 73.09278929963266, y: -202.13823408908823 },
    },
    { id: 'Geborand', data: { x: 166.42526509155203, y: -203.35631893025166 } },
    {
      id: 'Champtercier',
      data: { x: 136.50079011949393, y: -173.31713994489994 },
    },
    { id: 'Cravatte', data: { x: 49.73386834783965, y: -158.35364032480314 } },
    { id: 'Count', data: { x: 92.6225208923336, y: -164.5721119087628 } },
    { id: 'OldMan', data: { x: 182.67618755357603, y: -158.37537192550602 } },
    { id: 'Labarre', data: { x: 104.38638219495513, y: 102.35379216360033 } },
    { id: 'Valjean', data: { x: 101.3622950844204, y: 166.35853966634207 } },
    { id: 'Marguerite', data: { x: 15.473694881949076, y: 62.1659061841986 } },
    { id: 'Mme.deR', data: { x: 189.83413944818182, y: 177.11334052700522 } },
    { id: 'Isabeau', data: { x: 75.32301417462793, y: 70.21926737129205 } },
    { id: 'Gervais', data: { x: 176.72347036381973, y: 135.77505865827956 } },
    { id: 'Tholomyes', data: { x: -129.9521950385362, y: 76.91924343381031 } },
    {
      id: 'Listolier',
      data: { x: -197.00610036276584, y: -53.52051122348081 },
    },
    { id: 'Fameuil', data: { x: -121.60558891114913, y: -20.235901128145475 } },
    {
      id: 'Blacheville',
      data: { x: -194.08526073676455, y: 31.820762019008416 },
    },
    {
      id: 'Favourite',
      data: { x: -221.9573518515375, y: -10.185609488385722 },
    },
    { id: 'Dahlia', data: { x: -168.19724133346247, y: -9.19064962158248 } },
    { id: 'Zephine', data: { x: -148.03397490920997, y: -62.54187834507189 } },
    { id: 'Fantine', data: { x: -73.16833220245441, y: 57.28989848618734 } },
    {
      id: 'Mme.Thenardier',
      data: { x: -52.91716185285746, y: 239.08264079863517 },
    },
    { id: 'Thenardier', data: { x: 4.069731066014595, y: 297.5720887303138 } },
    { id: 'Cosette', data: { x: 90.43366713623547, y: 250.4647919707489 } },
    { id: 'Javert', data: { x: 9.353143255051812, y: 231.48020728690926 } },
    {
      id: 'Fauchelevent',
      data: { x: 6.009805028740205, y: 132.23378138707304 },
    },
    { id: 'Bamatabois', data: { x: 126.2864214940572, y: 54.61781558003907 } },
    { id: 'Perpetue', data: { x: -100.58115348177104, y: 117.54273430353142 } },
    { id: 'Simplice', data: { x: -35.06765479190085, y: 113.98002683630389 } },
    {
      id: 'Scaufflaire',
      data: { x: 149.60340519301351, y: 102.06778908391544 },
    },
    { id: 'Woman1', data: { x: 26.086727050180905, y: 170.96335108285226 } },
    { id: 'Judge', data: { x: 224.11511521402468, y: 10.377418264259392 } },
    {
      id: 'Champmathieu',
      data: { x: 175.03679853277904, y: 10.97422143383376 },
    },
    { id: 'Brevet', data: { x: 190.81947681814373, y: 56.615118686124795 } },
    { id: 'Chenildieu', data: { x: 221.4707211425868, y: 93.52202693245398 } },
    {
      id: 'Cochepaille',
      data: { x: 248.40410855542405, y: 52.47780921334404 },
    },
    { id: 'Pontmercy', data: { x: 152.64110107453254, y: 336.07174207440426 } },
    {
      id: 'Boulatruelle',
      data: { x: 61.83618927690742, y: 327.4257247723038 },
    },
    { id: 'Eponine', data: { x: -39.08189885070708, y: 408.12674004574313 } },
    { id: 'Anzelma', data: { x: -117.24367144763981, y: 291.2448795035354 } },
    { id: 'Woman2', data: { x: 56.98449061903156, y: 205.1062340259782 } },
    {
      id: 'MotherInnocent',
      data: { x: 45.5959712598788, y: 101.88489308306212 },
    },
    { id: 'Gribier', data: { x: -66.0044916812216, y: 150.88736617224052 } },
    { id: 'Jondrette', data: { x: -165.18674110429072, y: 586.9540619597046 } },
    {
      id: 'Mme.Burgon',
      data: { x: -109.89071541409426, y: 551.4855902340753 },
    },
    { id: 'Gavroche', data: { x: 19.997998013958284, y: 473.5862252433041 } },
    {
      id: 'Gillenormand',
      data: { x: 172.72203877140944, y: 281.87391872491247 },
    },
    { id: 'Magnon', data: { x: 94.0354414665153, y: 297.9478115091034 } },
    {
      id: 'Mlle.Gillenormand',
      data: { x: 226.6017096303119, y: 264.7225524326828 },
    },
    {
      id: 'Mme.Pontmercy',
      data: { x: 259.7910186172486, y: 322.62248233457916 },
    },
    {
      id: 'Mlle.Vaubois',
      data: { x: 295.0548533357655, y: 268.05560665867563 },
    },
    {
      id: 'Lt.Gillenormand',
      data: { x: 205.1150427111841, y: 321.74946441805787 },
    },
    { id: 'Marius', data: { x: 115.99534033074437, y: 396.923854919684 } },
    { id: 'BaronessT', data: { x: 207.92934530858835, y: 370.0068435862332 } },
    { id: 'Mabeuf', data: { x: 30.32792838740435, y: 548.2305849270829 } },
    { id: 'Enjolras', data: { x: 97.83395243357235, y: 475.75520539749624 } },
    { id: 'Combeferre', data: { x: 134.04272292547236, y: 544.4315937207078 } },
    { id: 'Prouvaire', data: { x: 180.42654201523405, y: 609.7975648223857 } },
    { id: 'Feuilly', data: { x: 184.8688194850093, y: 552.2258882080213 } },
    { id: 'Courfeyrac', data: { x: 82.4783928356412, y: 538.9322503747715 } },
    { id: 'Bahorel', data: { x: 132.71826059540984, y: 593.9366856899891 } },
    { id: 'Bossuet', data: { x: 155.45182182157794, y: 495.97664818194147 } },
    { id: 'Joly', data: { x: 81.9494446741924, y: 592.742772302466 } },
    { id: 'Grantaire', data: { x: 111.14421515608143, y: 641.6302705744649 } },
    {
      id: 'MotherPlutarch',
      data: { x: -36.79817686795277, y: 604.1495939614084 },
    },
    { id: 'Gueulemer', data: { x: -90.72044504393521, y: 335.2170501169596 } },
    { id: 'Babet', data: { x: -56.02350985362799, y: 299.0798054180837 } },
    { id: 'Claquesous', data: { x: 11.791943686296333, y: 351.9240034204146 } },
    {
      id: 'Montparnasse',
      data: { x: -39.64267018346576, y: 350.09454188065183 },
    },
    { id: 'Toussaint', data: { x: 138.66861913122864, y: 222.005592765025 } },
    { id: 'Child1', data: { x: -81.98547992053177, y: 509.03895576837806 } },
    { id: 'Child2', data: { x: -60.17318929170669, y: 552.039957981759 } },
    { id: 'Brujon', data: { x: -96.4856160087629, y: 395.8456485271644 } },
    {
      id: 'Mme.Hucheloup',
      data: { x: 36.08556743156615, y: 612.3553694091726 },
    },
  ],
  edges: [
    {
      id: 'edge-0.94426251441732821682674411434',
      source: 'Napoleon',
      target: 'Myriel',
      data: {},
    },
    {
      id: 'edge-0.99860651164019961682674411434',
      source: 'Mlle.Baptistine',
      target: 'Myriel',
      data: {},
    },
    {
      id: 'edge-0.231028581611399721682674411434',
      source: 'Mme.Magloire',
      target: 'Myriel',
      data: {},
    },
    {
      id: 'edge-0.95021238539153361682674411434',
      source: 'Mme.Magloire',
      target: 'Mlle.Baptistine',
      data: {},
    },
    {
      id: 'edge-0.8078441650926181682674411434',
      source: 'CountessdeLo',
      target: 'Myriel',
      data: {},
    },
    {
      id: 'edge-0.065426966728770571682674411434',
      source: 'Geborand',
      target: 'Myriel',
      data: {},
    },
    {
      id: 'edge-0.36649543216475711682674411434',
      source: 'Champtercier',
      target: 'Myriel',
      data: {},
    },
    {
      id: 'edge-0.172354743557898041682674411434',
      source: 'Cravatte',
      target: 'Myriel',
      data: {},
    },
    {
      id: 'edge-0.292511967563751682674411434',
      source: 'Count',
      target: 'Myriel',
      data: {},
    },
    {
      id: 'edge-0.65867207124375861682674411434',
      source: 'OldMan',
      target: 'Myriel',
      data: {},
    },
    {
      id: 'edge-0.45200581186962441682674411434',
      source: 'Valjean',
      target: 'Labarre',
      data: {},
    },
    {
      id: 'edge-0.056712965329641871682674411434',
      source: 'Valjean',
      target: 'Mme.Magloire',
      data: {},
    },
    {
      id: 'edge-0.2567867322629981682674411434',
      source: 'Valjean',
      target: 'Mlle.Baptistine',
      data: {},
    },
    {
      id: 'edge-0.73775469693124561682674411434',
      source: 'Valjean',
      target: 'Myriel',
      data: {},
    },
    {
      id: 'edge-0.41603333869883951682674411434',
      source: 'Marguerite',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.90615322517549821682674411434',
      source: 'Mme.deR',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.084819507229418671682674411434',
      source: 'Isabeau',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.79301896379206481682674411434',
      source: 'Gervais',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.43933304343544991682674411434',
      source: 'Listolier',
      target: 'Tholomyes',
      data: {},
    },
    {
      id: 'edge-0.51239099741946581682674411434',
      source: 'Fameuil',
      target: 'Tholomyes',
      data: {},
    },
    {
      id: 'edge-0.473693435123434541682674411434',
      source: 'Fameuil',
      target: 'Listolier',
      data: {},
    },
    {
      id: 'edge-0.28834446694141861682674411434',
      source: 'Blacheville',
      target: 'Tholomyes',
      data: {},
    },
    {
      id: 'edge-0.42105202160201281682674411434',
      source: 'Blacheville',
      target: 'Listolier',
      data: {},
    },
    {
      id: 'edge-0.3463473891329741682674411434',
      source: 'Blacheville',
      target: 'Fameuil',
      data: {},
    },
    {
      id: 'edge-0.64220089792700311682674411434',
      source: 'Favourite',
      target: 'Tholomyes',
      data: {},
    },
    {
      id: 'edge-0.65232006935448171682674411434',
      source: 'Favourite',
      target: 'Listolier',
      data: {},
    },
    {
      id: 'edge-0.290943179691484531682674411434',
      source: 'Favourite',
      target: 'Fameuil',
      data: {},
    },
    {
      id: 'edge-0.79501666455225161682674411434',
      source: 'Favourite',
      target: 'Blacheville',
      data: {},
    },
    {
      id: 'edge-0.69275965571708611682674411434',
      source: 'Dahlia',
      target: 'Tholomyes',
      data: {},
    },
    {
      id: 'edge-0.276161341193493561682674411434',
      source: 'Dahlia',
      target: 'Listolier',
      data: {},
    },
    {
      id: 'edge-0.244516108859559771682674411434',
      source: 'Dahlia',
      target: 'Fameuil',
      data: {},
    },
    {
      id: 'edge-0.5852299844764571682674411434',
      source: 'Dahlia',
      target: 'Blacheville',
      data: {},
    },
    {
      id: 'edge-0.417892307835375341682674411434',
      source: 'Dahlia',
      target: 'Favourite',
      data: {},
    },
    {
      id: 'edge-0.044095987634109821682674411434',
      source: 'Zephine',
      target: 'Tholomyes',
      data: {},
    },
    {
      id: 'edge-0.88323468140283761682674411434',
      source: 'Zephine',
      target: 'Listolier',
      data: {},
    },
    {
      id: 'edge-0.3751973553424891682674411434',
      source: 'Zephine',
      target: 'Fameuil',
      data: {},
    },
    {
      id: 'edge-0.31316087499051991682674411434',
      source: 'Zephine',
      target: 'Blacheville',
      data: {},
    },
    {
      id: 'edge-0.342969465963282041682674411434',
      source: 'Zephine',
      target: 'Favourite',
      data: {},
    },
    {
      id: 'edge-0.067833314988225091682674411434',
      source: 'Zephine',
      target: 'Dahlia',
      data: {},
    },
    {
      id: 'edge-0.332440623801925961682674411434',
      source: 'Fantine',
      target: 'Tholomyes',
      data: {},
    },
    {
      id: 'edge-0.121534270866835441682674411434',
      source: 'Fantine',
      target: 'Listolier',
      data: {},
    },
    {
      id: 'edge-0.26733530241149261682674411435',
      source: 'Fantine',
      target: 'Fameuil',
      data: {},
    },
    {
      id: 'edge-0.60678789030241751682674411435',
      source: 'Fantine',
      target: 'Blacheville',
      data: {},
    },
    {
      id: 'edge-0.34694487227428631682674411435',
      source: 'Fantine',
      target: 'Favourite',
      data: {},
    },
    {
      id: 'edge-0.91114356125722671682674411435',
      source: 'Fantine',
      target: 'Dahlia',
      data: {},
    },
    {
      id: 'edge-0.16738684255745251682674411435',
      source: 'Fantine',
      target: 'Zephine',
      data: {},
    },
    {
      id: 'edge-0.1844566970276381682674411435',
      source: 'Fantine',
      target: 'Marguerite',
      data: {},
    },
    {
      id: 'edge-0.70989724265110571682674411435',
      source: 'Fantine',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.87533336625855271682674411435',
      source: 'Mme.Thenardier',
      target: 'Fantine',
      data: {},
    },
    {
      id: 'edge-0.109604750587436021682674411435',
      source: 'Mme.Thenardier',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.75312748404097411682674411435',
      source: 'Thenardier',
      target: 'Mme.Thenardier',
      data: {},
    },
    {
      id: 'edge-0.477288681511722771682674411435',
      source: 'Thenardier',
      target: 'Fantine',
      data: {},
    },
    {
      id: 'edge-0.456718377221225551682674411435',
      source: 'Thenardier',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.276949478772393841682674411435',
      source: 'Cosette',
      target: 'Mme.Thenardier',
      data: {},
    },
    {
      id: 'edge-0.049166946954717131682674411435',
      source: 'Cosette',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.450100210164208871682674411435',
      source: 'Cosette',
      target: 'Tholomyes',
      data: {},
    },
    {
      id: 'edge-0.042415673589965451682674411435',
      source: 'Cosette',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.66015873145455671682674411435',
      source: 'Javert',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.60804751163727371682674411435',
      source: 'Javert',
      target: 'Fantine',
      data: {},
    },
    {
      id: 'edge-0.58310802650454651682674411435',
      source: 'Javert',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.065346135912593531682674411435',
      source: 'Javert',
      target: 'Mme.Thenardier',
      data: {},
    },
    {
      id: 'edge-0.82198850417901161682674411435',
      source: 'Javert',
      target: 'Cosette',
      data: {},
    },
    {
      id: 'edge-0.39298506374617051682674411435',
      source: 'Fauchelevent',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.68802702745174241682674411435',
      source: 'Fauchelevent',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.78560067603651641682674411435',
      source: 'Bamatabois',
      target: 'Fantine',
      data: {},
    },
    {
      id: 'edge-0.60138057209318661682674411435',
      source: 'Bamatabois',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.58230385462370381682674411435',
      source: 'Bamatabois',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.87093303448773241682674411435',
      source: 'Perpetue',
      target: 'Fantine',
      data: {},
    },
    {
      id: 'edge-0.30037510721363871682674411435',
      source: 'Simplice',
      target: 'Perpetue',
      data: {},
    },
    {
      id: 'edge-0.8836831376708171682674411435',
      source: 'Simplice',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.3682105469619071682674411435',
      source: 'Simplice',
      target: 'Fantine',
      data: {},
    },
    {
      id: 'edge-0.91404453921957091682674411435',
      source: 'Simplice',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.96841111794543731682674411435',
      source: 'Scaufflaire',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.33408597650440821682674411435',
      source: 'Woman1',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.80356007062289271682674411435',
      source: 'Woman1',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.140628067865315341682674411435',
      source: 'Judge',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.6389296400134291682674411435',
      source: 'Judge',
      target: 'Bamatabois',
      data: {},
    },
    {
      id: 'edge-0.148055986716679521682674411435',
      source: 'Champmathieu',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.035658545484153371682674411435',
      source: 'Champmathieu',
      target: 'Judge',
      data: {},
    },
    {
      id: 'edge-0.73293740647167071682674411435',
      source: 'Champmathieu',
      target: 'Bamatabois',
      data: {},
    },
    {
      id: 'edge-0.239695377585734451682674411435',
      source: 'Brevet',
      target: 'Judge',
      data: {},
    },
    {
      id: 'edge-0.294635749218463471682674411435',
      source: 'Brevet',
      target: 'Champmathieu',
      data: {},
    },
    {
      id: 'edge-0.8408987081866911682674411435',
      source: 'Brevet',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.8507477370490651682674411435',
      source: 'Brevet',
      target: 'Bamatabois',
      data: {},
    },
    {
      id: 'edge-0.70935448775708051682674411435',
      source: 'Chenildieu',
      target: 'Judge',
      data: {},
    },
    {
      id: 'edge-0.399172549315621741682674411435',
      source: 'Chenildieu',
      target: 'Champmathieu',
      data: {},
    },
    {
      id: 'edge-0.71915560015361611682674411435',
      source: 'Chenildieu',
      target: 'Brevet',
      data: {},
    },
    {
      id: 'edge-0.73477427763462241682674411435',
      source: 'Chenildieu',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.62389917472210521682674411435',
      source: 'Chenildieu',
      target: 'Bamatabois',
      data: {},
    },
    {
      id: 'edge-0.78230678099613591682674411435',
      source: 'Cochepaille',
      target: 'Judge',
      data: {},
    },
    {
      id: 'edge-0.80769474488559531682674411435',
      source: 'Cochepaille',
      target: 'Champmathieu',
      data: {},
    },
    {
      id: 'edge-0.73451360805713421682674411435',
      source: 'Cochepaille',
      target: 'Brevet',
      data: {},
    },
    {
      id: 'edge-0.076583788422395441682674411435',
      source: 'Cochepaille',
      target: 'Chenildieu',
      data: {},
    },
    {
      id: 'edge-0.72643996327727441682674411435',
      source: 'Cochepaille',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.78359715778152281682674411435',
      source: 'Cochepaille',
      target: 'Bamatabois',
      data: {},
    },
    {
      id: 'edge-0.345298190156229761682674411435',
      source: 'Pontmercy',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.99476390254167861682674411435',
      source: 'Boulatruelle',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.19991321390352091682674411435',
      source: 'Eponine',
      target: 'Mme.Thenardier',
      data: {},
    },
    {
      id: 'edge-0.16997586471317261682674411435',
      source: 'Eponine',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.5945102575348481682674411436',
      source: 'Anzelma',
      target: 'Eponine',
      data: {},
    },
    {
      id: 'edge-0.97771195041667361682674411436',
      source: 'Anzelma',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.30558743153287641682674411436',
      source: 'Anzelma',
      target: 'Mme.Thenardier',
      data: {},
    },
    {
      id: 'edge-0.83205084569769471682674411436',
      source: 'Woman2',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.62521996871070411682674411436',
      source: 'Woman2',
      target: 'Cosette',
      data: {},
    },
    {
      id: 'edge-0.0487477152885482661682674411436',
      source: 'Woman2',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.190105988117121431682674411436',
      source: 'MotherInnocent',
      target: 'Fauchelevent',
      data: {},
    },
    {
      id: 'edge-0.153784883932755131682674411436',
      source: 'MotherInnocent',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.88235198989674091682674411436',
      source: 'Gribier',
      target: 'Fauchelevent',
      data: {},
    },
    {
      id: 'edge-0.34121579765300391682674411436',
      source: 'Mme.Burgon',
      target: 'Jondrette',
      data: {},
    },
    {
      id: 'edge-0.252727027070864141682674411436',
      source: 'Gavroche',
      target: 'Mme.Burgon',
      data: {},
    },
    {
      id: 'edge-0.30234853669732041682674411436',
      source: 'Gavroche',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.275475417877780071682674411436',
      source: 'Gavroche',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.154202720432135681682674411436',
      source: 'Gavroche',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.381931185828450871682674411436',
      source: 'Gillenormand',
      target: 'Cosette',
      data: {},
    },
    {
      id: 'edge-0.132815646356887471682674411436',
      source: 'Gillenormand',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.226898965338760751682674411436',
      source: 'Magnon',
      target: 'Gillenormand',
      data: {},
    },
    {
      id: 'edge-0.103801981597435811682674411436',
      source: 'Magnon',
      target: 'Mme.Thenardier',
      data: {},
    },
    {
      id: 'edge-0.209883668004299471682674411436',
      source: 'Mlle.Gillenormand',
      target: 'Gillenormand',
      data: {},
    },
    {
      id: 'edge-0.87408780349514071682674411436',
      source: 'Mlle.Gillenormand',
      target: 'Cosette',
      data: {},
    },
    {
      id: 'edge-0.75607981343795741682674411436',
      source: 'Mlle.Gillenormand',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.26709703829364221682674411436',
      source: 'Mme.Pontmercy',
      target: 'Mlle.Gillenormand',
      data: {},
    },
    {
      id: 'edge-0.220827786903807551682674411437',
      source: 'Mme.Pontmercy',
      target: 'Pontmercy',
      data: {},
    },
    {
      id: 'edge-0.205991063419284081682674411437',
      source: 'Mlle.Vaubois',
      target: 'Mlle.Gillenormand',
      data: {},
    },
    {
      id: 'edge-0.253504192846544461682674411437',
      source: 'Lt.Gillenormand',
      target: 'Mlle.Gillenormand',
      data: {},
    },
    {
      id: 'edge-0.89659256574190541682674411438',
      source: 'Lt.Gillenormand',
      target: 'Gillenormand',
      data: {},
    },
    {
      id: 'edge-0.214077779876206351682674411438',
      source: 'Lt.Gillenormand',
      target: 'Cosette',
      data: {},
    },
    {
      id: 'edge-0.84201908333514291682674411438',
      source: 'Marius',
      target: 'Mlle.Gillenormand',
      data: {},
    },
    {
      id: 'edge-0.68959597581568551682674411438',
      source: 'Marius',
      target: 'Gillenormand',
      data: {},
    },
    {
      id: 'edge-0.7877926447749271682674411438',
      source: 'Marius',
      target: 'Pontmercy',
      data: {},
    },
    {
      id: 'edge-0.7982808004481271682674411441',
      source: 'Marius',
      target: 'Lt.Gillenormand',
      data: {},
    },
    {
      id: 'edge-0.76247605995971981682674411441',
      source: 'Marius',
      target: 'Cosette',
      data: {},
    },
    {
      id: 'edge-0.16462184734916121682674411441',
      source: 'Marius',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.0295879759477102321682674411441',
      source: 'Marius',
      target: 'Tholomyes',
      data: {},
    },
    {
      id: 'edge-0.85862528834230021682674411441',
      source: 'Marius',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.189291944801538661682674411441',
      source: 'Marius',
      target: 'Eponine',
      data: {},
    },
    {
      id: 'edge-0.90338016160271171682674411441',
      source: 'Marius',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.25433213551333211682674411441',
      source: 'BaronessT',
      target: 'Gillenormand',
      data: {},
    },
    {
      id: 'edge-0.318145986257760251682674411441',
      source: 'BaronessT',
      target: 'Marius',
      data: {},
    },
    {
      id: 'edge-0.37426844971546181682674411441',
      source: 'Mabeuf',
      target: 'Marius',
      data: {},
    },
    {
      id: 'edge-0.79423138775875461682674411441',
      source: 'Mabeuf',
      target: 'Eponine',
      data: {},
    },
    {
      id: 'edge-0.84434775106973331682674411441',
      source: 'Mabeuf',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.47359817208803381682674411441',
      source: 'Enjolras',
      target: 'Marius',
      data: {},
    },
    {
      id: 'edge-0.404585930766581561682674411441',
      source: 'Enjolras',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.475628424169463271682674411441',
      source: 'Enjolras',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.84788570151295041682674411441',
      source: 'Enjolras',
      target: 'Mabeuf',
      data: {},
    },
    {
      id: 'edge-0.236652804700200341682674411441',
      source: 'Enjolras',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.76264764678282561682674411441',
      source: 'Combeferre',
      target: 'Enjolras',
      data: {},
    },
    {
      id: 'edge-0.50362271036410111682674411441',
      source: 'Combeferre',
      target: 'Marius',
      data: {},
    },
    {
      id: 'edge-0.124953670509723841682674411441',
      source: 'Combeferre',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.99519829537259621682674411441',
      source: 'Combeferre',
      target: 'Mabeuf',
      data: {},
    },
    {
      id: 'edge-0.94106031293724591682674411441',
      source: 'Prouvaire',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.092954290055516031682674411441',
      source: 'Prouvaire',
      target: 'Enjolras',
      data: {},
    },
    {
      id: 'edge-0.60652905535154011682674411441',
      source: 'Prouvaire',
      target: 'Combeferre',
      data: {},
    },
    {
      id: 'edge-0.0021589454329222771682674411441',
      source: 'Feuilly',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.71398534488970961682674411441',
      source: 'Feuilly',
      target: 'Enjolras',
      data: {},
    },
    {
      id: 'edge-0.85939519586789431682674411441',
      source: 'Feuilly',
      target: 'Prouvaire',
      data: {},
    },
    {
      id: 'edge-0.58674609518882991682674411441',
      source: 'Feuilly',
      target: 'Combeferre',
      data: {},
    },
    {
      id: 'edge-0.5212783586611461682674411441',
      source: 'Feuilly',
      target: 'Mabeuf',
      data: {},
    },
    {
      id: 'edge-0.3811748562478031682674411441',
      source: 'Feuilly',
      target: 'Marius',
      data: {},
    },
    {
      id: 'edge-0.90335667302999711682674411441',
      source: 'Courfeyrac',
      target: 'Marius',
      data: {},
    },
    {
      id: 'edge-0.477268813630447261682674411441',
      source: 'Courfeyrac',
      target: 'Enjolras',
      data: {},
    },
    {
      id: 'edge-0.77630607590182791682674411441',
      source: 'Courfeyrac',
      target: 'Combeferre',
      data: {},
    },
    {
      id: 'edge-0.72613549486036691682674411441',
      source: 'Courfeyrac',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.32935692884980061682674411441',
      source: 'Courfeyrac',
      target: 'Mabeuf',
      data: {},
    },
    {
      id: 'edge-0.227732282118091821682674411441',
      source: 'Courfeyrac',
      target: 'Eponine',
      data: {},
    },
    {
      id: 'edge-0.55669926136025951682674411441',
      source: 'Courfeyrac',
      target: 'Feuilly',
      data: {},
    },
    {
      id: 'edge-0.50018348766595191682674411441',
      source: 'Courfeyrac',
      target: 'Prouvaire',
      data: {},
    },
    {
      id: 'edge-0.34403149346624941682674411441',
      source: 'Bahorel',
      target: 'Combeferre',
      data: {},
    },
    {
      id: 'edge-0.227053151579178051682674411441',
      source: 'Bahorel',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.26359011292652371682674411441',
      source: 'Bahorel',
      target: 'Courfeyrac',
      data: {},
    },
    {
      id: 'edge-0.373262065849569341682674411441',
      source: 'Bahorel',
      target: 'Mabeuf',
      data: {},
    },
    {
      id: 'edge-0.485665247135774971682674411441',
      source: 'Bahorel',
      target: 'Enjolras',
      data: {},
    },
    {
      id: 'edge-0.30383019806565151682674411441',
      source: 'Bahorel',
      target: 'Feuilly',
      data: {},
    },
    {
      id: 'edge-0.16478575567476341682674411441',
      source: 'Bahorel',
      target: 'Prouvaire',
      data: {},
    },
    {
      id: 'edge-0.5860572987864781682674411441',
      source: 'Bahorel',
      target: 'Marius',
      data: {},
    },
    {
      id: 'edge-0.47271535041226121682674411441',
      source: 'Bossuet',
      target: 'Marius',
      data: {},
    },
    {
      id: 'edge-0.124665610925859931682674411441',
      source: 'Bossuet',
      target: 'Courfeyrac',
      data: {},
    },
    {
      id: 'edge-0.59648370666194861682674411441',
      source: 'Bossuet',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.70618882196455911682674411441',
      source: 'Bossuet',
      target: 'Bahorel',
      data: {},
    },
    {
      id: 'edge-0.68337088941665441682674411441',
      source: 'Bossuet',
      target: 'Enjolras',
      data: {},
    },
    {
      id: 'edge-0.66934334774414821682674411441',
      source: 'Bossuet',
      target: 'Feuilly',
      data: {},
    },
    {
      id: 'edge-0.98762463940894811682674411441',
      source: 'Bossuet',
      target: 'Prouvaire',
      data: {},
    },
    {
      id: 'edge-0.29270423826599611682674411441',
      source: 'Bossuet',
      target: 'Combeferre',
      data: {},
    },
    {
      id: 'edge-0.02043339004940271682674411441',
      source: 'Bossuet',
      target: 'Mabeuf',
      data: {},
    },
    {
      id: 'edge-0.204622683915120621682674411441',
      source: 'Bossuet',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.125519045386945031682674411441',
      source: 'Joly',
      target: 'Bahorel',
      data: {},
    },
    {
      id: 'edge-0.191566842278338981682674411442',
      source: 'Joly',
      target: 'Bossuet',
      data: {},
    },
    {
      id: 'edge-0.82683834550544641682674411442',
      source: 'Joly',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.95592952803160711682674411442',
      source: 'Joly',
      target: 'Courfeyrac',
      data: {},
    },
    {
      id: 'edge-0.33788280998680141682674411442',
      source: 'Joly',
      target: 'Enjolras',
      data: {},
    },
    {
      id: 'edge-0.423350907237080241682674411442',
      source: 'Joly',
      target: 'Feuilly',
      data: {},
    },
    {
      id: 'edge-0.59173222509726871682674411442',
      source: 'Joly',
      target: 'Prouvaire',
      data: {},
    },
    {
      id: 'edge-0.0315308510496417061682674411442',
      source: 'Joly',
      target: 'Combeferre',
      data: {},
    },
    {
      id: 'edge-0.9897250394414371682674411442',
      source: 'Joly',
      target: 'Mabeuf',
      data: {},
    },
    {
      id: 'edge-0.0399844643851015041682674411442',
      source: 'Joly',
      target: 'Marius',
      data: {},
    },
    {
      id: 'edge-0.87947059714942541682674411442',
      source: 'Grantaire',
      target: 'Bossuet',
      data: {},
    },
    {
      id: 'edge-0.62691870862429471682674411442',
      source: 'Grantaire',
      target: 'Enjolras',
      data: {},
    },
    {
      id: 'edge-0.253638506734363171682674411442',
      source: 'Grantaire',
      target: 'Combeferre',
      data: {},
    },
    {
      id: 'edge-0.15730747992159411682674411442',
      source: 'Grantaire',
      target: 'Courfeyrac',
      data: {},
    },
    {
      id: 'edge-0.30325259503112181682674411442',
      source: 'Grantaire',
      target: 'Joly',
      data: {},
    },
    {
      id: 'edge-0.63976607012452781682674411442',
      source: 'Grantaire',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.96762765655926521682674411442',
      source: 'Grantaire',
      target: 'Bahorel',
      data: {},
    },
    {
      id: 'edge-0.8511766854632771682674411442',
      source: 'Grantaire',
      target: 'Feuilly',
      data: {},
    },
    {
      id: 'edge-0.68983967545778341682674411442',
      source: 'Grantaire',
      target: 'Prouvaire',
      data: {},
    },
    {
      id: 'edge-0.107044988356579381682674411442',
      source: 'MotherPlutarch',
      target: 'Mabeuf',
      data: {},
    },
    {
      id: 'edge-0.82438188463308971682674411442',
      source: 'Gueulemer',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.461665003680916231682674411442',
      source: 'Gueulemer',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.40042039921670281682674411442',
      source: 'Gueulemer',
      target: 'Mme.Thenardier',
      data: {},
    },
    {
      id: 'edge-0.178009776973985231682674411442',
      source: 'Gueulemer',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.38081945964717191682674411442',
      source: 'Gueulemer',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.066277904481232271682674411442',
      source: 'Gueulemer',
      target: 'Eponine',
      data: {},
    },
    {
      id: 'edge-0.82495994992927571682674411442',
      source: 'Babet',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.42672332328738661682674411442',
      source: 'Babet',
      target: 'Gueulemer',
      data: {},
    },
    {
      id: 'edge-0.28203975700069541682674411442',
      source: 'Babet',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.439769188689471461682674411442',
      source: 'Babet',
      target: 'Mme.Thenardier',
      data: {},
    },
    {
      id: 'edge-0.99294421383635621682674411442',
      source: 'Babet',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.69623771151558021682674411442',
      source: 'Babet',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.111145533841604081682674411442',
      source: 'Babet',
      target: 'Eponine',
      data: {},
    },
    {
      id: 'edge-0.168485465185092221682674411442',
      source: 'Claquesous',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.391884604016486951682674411442',
      source: 'Claquesous',
      target: 'Babet',
      data: {},
    },
    {
      id: 'edge-0.138653209457862751682674411442',
      source: 'Claquesous',
      target: 'Gueulemer',
      data: {},
    },
    {
      id: 'edge-0.97343417914557471682674411442',
      source: 'Claquesous',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.62377181923479121682674411442',
      source: 'Claquesous',
      target: 'Mme.Thenardier',
      data: {},
    },
    {
      id: 'edge-0.50924097222894681682674411442',
      source: 'Claquesous',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.78092203759399691682674411442',
      source: 'Claquesous',
      target: 'Eponine',
      data: {},
    },
    {
      id: 'edge-0.32758403868446861682674411442',
      source: 'Claquesous',
      target: 'Enjolras',
      data: {},
    },
    {
      id: 'edge-0.19242199019361441682674411442',
      source: 'Montparnasse',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.97240943948053671682674411442',
      source: 'Montparnasse',
      target: 'Babet',
      data: {},
    },
    {
      id: 'edge-0.51488593704327461682674411442',
      source: 'Montparnasse',
      target: 'Gueulemer',
      data: {},
    },
    {
      id: 'edge-0.93226249028656991682674411442',
      source: 'Montparnasse',
      target: 'Claquesous',
      data: {},
    },
    {
      id: 'edge-0.50503515274360861682674411442',
      source: 'Montparnasse',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.8536430249975261682674411442',
      source: 'Montparnasse',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.69217430565159571682674411442',
      source: 'Montparnasse',
      target: 'Eponine',
      data: {},
    },
    {
      id: 'edge-0.1301411739165691682674411442',
      source: 'Montparnasse',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.32466873689474321682674411442',
      source: 'Toussaint',
      target: 'Cosette',
      data: {},
    },
    {
      id: 'edge-0.0606930841536186261682674411442',
      source: 'Toussaint',
      target: 'Javert',
      data: {},
    },
    {
      id: 'edge-0.0202145994263638331682674411442',
      source: 'Toussaint',
      target: 'Valjean',
      data: {},
    },
    {
      id: 'edge-0.75581691220655881682674411442',
      source: 'Child1',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.174634326666427641682674411442',
      source: 'Child2',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.90289700540204421682674411442',
      source: 'Child2',
      target: 'Child1',
      data: {},
    },
    {
      id: 'edge-0.425135213542229941682674411442',
      source: 'Brujon',
      target: 'Babet',
      data: {},
    },
    {
      id: 'edge-0.71319153783058731682674411442',
      source: 'Brujon',
      target: 'Gueulemer',
      data: {},
    },
    {
      id: 'edge-0.77592898760704541682674411443',
      source: 'Brujon',
      target: 'Thenardier',
      data: {},
    },
    {
      id: 'edge-0.99288708628786141682674411443',
      source: 'Brujon',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.58497187420653311682674411443',
      source: 'Brujon',
      target: 'Eponine',
      data: {},
    },
    {
      id: 'edge-0.77970481583776881682674411443',
      source: 'Brujon',
      target: 'Claquesous',
      data: {},
    },
    {
      id: 'edge-0.50776121935361011682674411443',
      source: 'Brujon',
      target: 'Montparnasse',
      data: {},
    },
    {
      id: 'edge-0.28100645616034581682674411443',
      source: 'Mme.Hucheloup',
      target: 'Bossuet',
      data: {},
    },
    {
      id: 'edge-0.97265341829025531682674411443',
      source: 'Mme.Hucheloup',
      target: 'Joly',
      data: {},
    },
    {
      id: 'edge-0.56023993361378381682674411443',
      source: 'Mme.Hucheloup',
      target: 'Grantaire',
      data: {},
    },
    {
      id: 'edge-0.50413834611251281682674411443',
      source: 'Mme.Hucheloup',
      target: 'Bahorel',
      data: {},
    },
    {
      id: 'edge-0.230087900774115451682674411443',
      source: 'Mme.Hucheloup',
      target: 'Courfeyrac',
      data: {},
    },
    {
      id: 'edge-0.50989880849527961682674411443',
      source: 'Mme.Hucheloup',
      target: 'Gavroche',
      data: {},
    },
    {
      id: 'edge-0.96134153681775961682674411443',
      source: 'Mme.Hucheloup',
      target: 'Enjolras',
      data: {},
    },
  ],
};

const clusters = [
  [
    'Count',
    'Champtercier',
    'CountessdeLo',
    'Geborand',
    'OldMan',
    'Napoleon',
    'Cravatte',
    'Myriel',
    'Mme.Magloire',
    'Mlle.Baptistine',
  ],
  [
    'Tholomyes',
    'Listolier',
    'Fameuil',
    'Blacheville',
    'Favourite',
    'Dahlia',
    'Zephine',
  ],
  [
    'Bamatabois',
    'Judge',
    'Champmathieu',
    'Brevet',
    'Chenildieu',
    'Cochepaille',
  ],
  [
    'Mabeuf',
    'Enjolras',
    'Combeferre',
    'Prouvaire',
    'Feuilly',
    'Courfeyrac',
    'Bahorel',
    'Bossuet',
    'Joly',
    'Grantaire',
    'MotherPlutarch',
    'Mme.Hucheloup',
  ],
  ['Jondrette', 'Mme.Burgon', 'Gavroche', 'Child1', 'Child2'],
  [
    'Mme.Thenardier',
    'Thenardier',
    'Javert',
    'Fauchelevent',
    'Woman1',
    'Eponine',
    'Anzelma',
    'MotherInnocent',
    'Gribier',
    'Gueulemer',
    'Babet',
    'Claquesous',
    'Montparnasse',
    'Brujon',
  ],
];
const nodes = data.nodes.map((node) => {
  let nocluster = true;
  clusters.forEach((cluster, i) => {
    if (cluster.includes(node.id)) {
      // @ts-ignore
      node.data.cluster = i + 1;
      nocluster = false;
    }
  });
  if (nocluster) {
    // @ts-ignore
    node.data.cluster = 0;
  }
  node.data.layout = {
    id: node.id,
    x: node.data.x,
    y: node.data.y,
  };
  return node;
});

// nodes = nodes.concat(
//   nodes.map((node) => {
//     return {
//       ...node,
//       id: `${node.id}-2`,
//       data: {
//         ...node.data,
//         x: node.data.x + 500,
//       },
//     };
//   }),
// );
// .concat(
//   nodes.map((node) => {
//     return {
//       ...node,
//       id: `${node.id}-3`,
//       data: {
//         ...node.data,
//         x: node.data.x + 1000,
//       },
//     };
//   }),
// );
// .concat(
//   nodes.map((node) => {
//     return {
//       ...node,
//       id: `${node.id}-4`,
//       data: {
//         ...node.data,
//         x: node.data.x + 1500,
//       },
//     };
//   }),
// )
// .concat(
//   nodes.map((node) => {
//     return {
//       ...node,
//       id: `${node.id}-5`,
//       data: {
//         ...node.data,
//         y: node.data.y + 1000,
//       },
//     };
//   }),
// )
// .concat(
//   nodes.map((node) => {
//     return {
//       ...node,
//       id: `${node.id}-6`,
//       data: {
//         ...node.data,
//         x: node.data.x + 500,
//         y: node.data.y + 1000,
//       },
//     };
//   }),
// )
// .concat(
//   nodes.map((node) => {
//     return {
//       ...node,
//       id: `${node.id}-7`,
//       data: {
//         ...node.data,
//         x: node.data.x + 1000,
//         y: node.data.y + 1000,
//       },
//     };
//   }),
// )
// .concat(
//   nodes.map((node) => {
//     return {
//       ...node,
//       id: `${node.id}-8`,
//       data: {
//         ...node.data,
//         x: node.data.x + 1500,
//         y: node.data.y + 1000,
//       },
//     };
//   }),
// );
const edges = data.edges;
// const edges = data.edges.concat(
//   data.edges.map((edge) => {
//     return {
//       ...edge,
//       id: `${edge.id}-2`,
//       source: `${edge.source}-2`,
//       target: `${edge.target}-2`,
//     };
//   }),
// );
// .concat(
//   data.edges.map((edge) => {
//     return {
//       ...edge,
//       id: `${edge.id}-3`,
//       source: `${edge.source}-3`,
//       target: `${edge.target}-3`,
//     };
//   }),
// )
// .concat(
//   data.edges.map((edge) => {
//     return {
//       ...edge,
//       id: `${edge.id}-4`,
//       source: `${edge.source}-4`,
//       target: `${edge.target}-4`,
//     };
//   }),
// )
// .concat(
//   data.edges.map((edge) => {
//     return {
//       ...edge,
//       id: `${edge.id}-5`,
//       source: `${edge.source}-5`,
//       target: `${edge.target}-5`,
//     };
//   }),
// )
// .concat(
//   data.edges.map((edge) => {
//     return {
//       ...edge,
//       id: `${edge.id}-6`,
//       source: `${edge.source}-6`,
//       target: `${edge.target}-6`,
//     };
//   }),
// )
// .concat(
//   data.edges.map((edge) => {
//     return {
//       ...edge,
//       id: `${edge.id}-7`,
//       source: `${edge.source}-7`,
//       target: `${edge.target}-7`,
//     };
//   }),
// )
// .concat(
//   data.edges.map((edge) => {
//     return {
//       ...edge,
//       id: `${edge.id}-8`,
//       source: `${edge.source}-8`,
//       target: `${edge.target}-8`,
//     };
//   }),
// );

const degrees = {};
edges.forEach((edge) => {
  const { source, target } = edge;
  degrees[source] = degrees[source] || 0;
  degrees[target] = degrees[target] || 0;
  degrees[source]++;
  degrees[target]++;
});

const createGraph = async () => {
  const supported = await supportsThreads();
  const threads = await initThreads(supported);
  G6.stdLib.layouts['force-wasm'] = ForceLayout;
  G6.stdLib.layouts['fruchterman-wasm'] = FruchtermanLayout;
  const graph = new G6.Graph({
    container: container as HTMLElement,
    width,
    height: 1200,
    type: 'graph',
    // renderer: 'webgl',
    data: { nodes, edges },
    layout: {
      type: 'force-wasm',
      threads,
      dimensions: 2,
      maxIteration: 800,
      minMovement: 0.4,
      distanceThresholdMode: 'mean',
      factor: 1,
      gravity: 10,
      linkDistance: 80,
      edgeStrength: 200,
      nodeStrength: 1000,
      coulombDisScale: 0.005,
      damping: 0.9,
      maxSpeed: 1000,
      interval: 0.02,
    },
    modes: {
      default: [
        'zoom-canvas',
        'drag-canvas',
        'drag-node',
        'brush-select',
        'click-select',
        'hover-activate',
      ],
    },
    theme: {
      type: 'spec',
      specification: {
        node: {
          dataTypeField: 'cluster',
        },
      },
    },
    edge: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          keyShape: {
            lineWidth: 0.5,
          },
          haloShape: {},
          animates: {
            buildIn: [
              {
                fields: ['opacity'],
                shapeId: 'keyShape',
                duration: 500,
                delay: 1000,
              },
            ],
            buildOut: [
              {
                fields: ['opacity'],
                duration: 200,
              },
            ],
            update: [
              {
                fields: ['lineWidth'],
                shapeId: 'keyShape',
              },
              {
                fields: ['opacity'], // 'r' error, 'lineWidth' has no effect
                shapeId: 'haloShape',
              },
            ],
          },
        },
      };
    },
    node: (innerModel) => {
      const degree = degrees[innerModel.id] || 0;
      let labelLod = 4;
      if (degree > 20) labelLod = -1;
      else if (degree > 15) labelLod = 0;
      else if (degree > 10) labelLod = 1;
      else if (degree > 6) labelLod = 2;
      else if (degree > 3) labelLod = 3;

      const badgeShapes = {};

      if (degree > 20) {
        badgeShapes[0] = {
          text: '核心人员',
          position: 'right' as IBadgePosition,
          color: '#389e0d',
          lod: labelLod - 2,
        };
      }
      if (degree > 15) {
        badgeShapes[1] = {
          text: 'A',
          position: 'rightTop' as IBadgePosition,
          color: '#d4380d',
          lod: labelLod - 1,
        };
      }
      if (degree > 10) {
        badgeShapes[2] = {
          text: 'B',
          position: 'rightBottom' as IBadgePosition,
          color: '#aaa',
          lod: labelLod - 1,
        };
      }

      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          lodStrategy: {
            levels: [
              { zoomRange: [0, 0.8] }, // -2
              { zoomRange: [0.8, 0.9] }, // -1
              { zoomRange: [0.9, 1], primary: true }, // 0
              { zoomRange: [1, 1.1] }, // 1
              { zoomRange: [1.1, 0.2] }, // 2
              { zoomRange: [1.2, 1.3] }, // 3
              { zoomRange: [1.3, 1.4] }, // 4
              { zoomRange: [1.4, 1.5] }, // 5
              { zoomRange: [1.5, Infinity] }, // 6
            ],
            animateCfg: {
              duration: 500,
            },
          },

          animates: {
            buildIn: [
              {
                fields: ['opacity'],
                duration: 1000,
                delay: 500 + Math.random() * 500,
              },
            ],
            buildOut: [
              {
                fields: ['opacity'],
                duration: 200,
              },
            ],
            hide: [
              {
                fields: ['size'],
                duration: 200,
              },
              {
                fields: ['opacity'],
                duration: 200,
                shapeId: 'keyShape',
              },
              {
                fields: ['opacity'],
                duration: 200,
                shapeId: 'labelShape',
              },
            ],
            show: [
              {
                fields: ['size'],
                duration: 200,
              },
              {
                fields: ['opacity'],
                duration: 200,
                shapeId: 'keyShape',
                order: 0,
              },
            ],
            update: [
              {
                fields: ['fill', 'r'],
                shapeId: 'keyShape',
              },
              {
                fields: ['lineWidth'],
                shapeId: 'keyShape',
                duration: 100,
              },
              {
                fields: ['fontSize'],
                shapeId: 'iconShape',
              },
              {
                fields: ['opacity'], // 'r' error, 'lineWidth' has no effect
                shapeId: 'haloShape',
              },
            ],
          },
          haloShape: {},
          // animate in shapes, unrelated to each other, excuted parallely
          keyShape: {
            r: innerModel.data.size ? innerModel.data.size / 2 : 15,
          },
          iconShape: {
            img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
            fill: '#fff',
            lod: labelLod - 1,
            fontSize: innerModel.data.size ? innerModel.data.size / 3 + 5 : 13,
          },
          labelShape: {
            text: innerModel.id,
            opacity: 0.8,
            maxWidth: '150%',
            lod: labelLod,
          },
          labelBackgroundShape: {
            lod: labelLod,
          },
          badgeShapes,
        },
      };
    },
  });
  graph.zoomTo(0.7);
  return graph;
};

export default async () => {
  console.log(
    'graphsize: #NODE:',
    nodes.length,
    ', #EDGE:',
    edges.length,
    '#SHAPES',
    nodes.length * 10 + edges.length * 4,
  );
  let graph = await createGraph();

  const btnImportance = document.createElement('button');
  btnImportance.innerHTML = '节点重要性分析';
  btnImportance.style.position = 'absolute';
  btnImportance.style.top = '164px';
  btnImportance.style.left = '373px';
  btnImportance.style.zIndex = '100';
  document.body.appendChild(btnImportance);
  btnImportance.addEventListener('click', (e) => {
    graph.updateData(
      'node',
      nodes.map((node) => ({
        id: node.id,
        data: {
          size: degrees[node.id] + 24,
        },
      })),
    );
  });

  const btnColor = document.createElement('button');
  btnColor.innerHTML = '更换颜色顺序';
  btnColor.style.position = 'absolute';
  btnColor.style.top = '164px';
  btnColor.style.left = '573px';
  btnColor.style.zIndex = '100';
  document.body.appendChild(btnColor);
  btnColor.addEventListener('click', (e) => {
    graph.updateData(
      'node',
      nodes.map((node) => ({
        id: node.id,
        data: {
          cluster: node.data.cluster + 1,
        },
      })),
    );
  });

  const btnDestroy = document.createElement('button');
  btnDestroy.innerHTML = '销毁图';
  btnDestroy.style.position = 'absolute';
  btnDestroy.style.top = '164px';
  btnDestroy.style.left = '773px';
  btnDestroy.style.zIndex = '100';
  document.body.appendChild(btnDestroy);
  btnDestroy.addEventListener('click', async (e) => {
    if (graph.destroyed) {
      graph = await createGraph();
    } else {
      graph.destroy();
    }
  });
  return graph;
};
