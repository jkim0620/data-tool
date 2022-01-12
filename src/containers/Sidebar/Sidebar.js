import React, { useContext, useRef, } from 'react'
import Filter from '../Filter/Filter';
import ToolContext from '../../hooks/ToolContext';
import ToggleViewBubble from '../../assets/img/toggleView-bubble.svg';
import ToggleViewHeatmap from '../../assets/img/toggleView-heatmap.svg';
import RightArrow from '../../assets/img/right-arrow.svg';

const Sidebar = () => {
    const { handleViewSelect, selectedView, selectedIndustry, } = useContext(ToolContext);
    const ctaRef = useRef(),
          toggleRef = useRef();    

    const showToggleViewCta = () => {
        ctaRef.current.className = 'hide';
        toggleRef.current.className = 'flex';
    }

    return (
        <div className="tool-wrapper__sidebar">
            <div className="flex tool-wrapper__sidebar--header">
                <div className="hide flex-v-center" ref={toggleRef}>
                    <div className="font-text-bold white" style={{ paddingTop: '3px' }}>Toggle View</div>
                    <div className="toggle-btn pointer" onClick={() => { handleViewSelect(`${selectedView === 'bubble' ? 'heatmap' : 'bubble'}`); }}><img src={`${selectedView === 'bubble' ? ToggleViewBubble : ToggleViewHeatmap}`} /></div>
                </div>
            </div>

            <Filter />

            <p className="tool-wrapper__sidebar--label / ultraLight font-text-bold">Industry Takeaway:</p>            
            {selectedView === 'bubble' ?
                <React.Fragment>
                    {selectedIndustry === 'Athletic Apparel' && <p>The overall imbalance favoring <span className="font-text-bold emerald">Demand-side functions</span> exceeds 2:1 for brands producing “soft goods” where detailed documentation of the manufacturing process suffers in favor of the product use and sustainability of apparel and footwear with a short, limited lifespan.</p>}
                    {selectedIndustry === 'Automotive' && <p>Among the minority of industries favoring <span className="font-text-bold yolk">Supply-side functions</span>, detailed documentation about <span className="font-text-bold yolk">manufacturing</span> extends to the <span className="font-text-bold yolk">movement</span> of OEM vehicles through a well-established, 3-tier supply chain.</p>}
                    {selectedIndustry === 'Beauty' && <p>Beauty brands register the highest concentration of documentation around <span className="font-text-bold emerald">product use</span> and tie for the lowest documentation on <span className="font-text-bold yolk">sourcing</span>, reflecting a premium on marketing found among luxury and premium brands.</p>}
                    {selectedIndustry === 'Chemicals & Materials' && <p>Chemicals & Material brands register the highest share of documentation in the regenerative function, reflecting the need to adhere to regulations governing the disclosure of industrial processes that are potentially harmful to human health and the environment.</p>}
                    {selectedIndustry === 'Consumer Packaged Goods' && <p>In contrast to adjacent industries such as Beauty, CPG brands inspire more documentation around the manufacturing process, driven by a need to demonstrate the health and safety of products used with greater frequency by more members of the immediate family.</p>}
                    {selectedIndustry === 'Food & Beverage' && <p>Among the most “balanced” industries across competing function (with one notable exception), Food & Beverage reflects a wider reliance on indirect distribution channels and wholesalers to <span className="font-text-bold emerald">sell</span> perishable product to consumers.</p>}
                    {selectedIndustry === 'Health & Pharma' && <p>Rivaled only by CPG, Health & Pharma brands demonstrated the largest concentration of documentation specific to <span className="font-text-bold yolk">manufacturing</span>, reflecting the extended 5-step approval process defined by the FDA and other regulatory bodies for product safety monitoring.</p>}
                    {selectedIndustry === 'Industrial Equipment' && <p>In contrast to Automotive brands, Industrial Equipment manufacturers are focused on extending fleet life via <span className="font-text-bold emerald">regenerative</span> mechanisms (repair/refurbish) for product that undergo fewer changes over longer refresh cycles.</p>}
                    {selectedIndustry === 'Multinationals' && <p>Representing some of the most complex and diversified product assortments (including Aerospace & Defense), Multinational brands have a similar signature as CPG, producing mass documentation on manufacturing that served to reinforce reputation, reliability, and safety record.</p>}
                    {selectedIndustry === 'Retail & Grocery' && <p>Apart from select private label brands, Retailers & Grocers represent the primary distribution channels for three other industries represented in this sample, eclipsing all of them in <span className="font-text-bold emerald">product use</span> by double digits.</p>}
                    {selectedIndustry === 'Technology' && <p>As the greatest contributor to overall digital artifacts recorded in our semantic analysis (36% of total results), the tech brands most closely mimics the view of all industries in aggregate.</p>}                    
                </React.Fragment>
                :
                <React.Fragment>
                    {selectedIndustry === 'Athletic Apparel' && <p>High marks for Smart Networks and <span className="font-text-bold pink">Self-Healing Products</span>, reflecting long supply chains involving numerous partners and overinvestment in technology that extends the lifespan of high-impact activewear.</p>}
                    {selectedIndustry === 'Automotive' && <p>High marks for <span className="font-text-bold pink">Collaborative Sourcing</span> and <span className="font-text-bold pink">ReX Marketplace</span>, reflecting underlying complexity of product and current supply shortages putting pressure of certified pre-owned (CPO) programs and secondary markets.</p>}
                    {selectedIndustry === 'Beauty' && <p>High marks for <span className="font-text-bold pink">Collaborative Sourcing</span> and <span className="font-text-bold pink">Zero Waste Ecosystems</span>, reflecting customer value generated through perception of ESG commitments and increasing personalization of product assortment.</p>}
                    {selectedIndustry === 'Chemicals & Materials' && <p>High marks for <span className="font-text-bold pink">Lights-Out, On-Demand</span> and <span className="font-text-bold pink">Self-Healing Products</span>, reflecting industry’s gradual evolution away from batch manufacturing towards more agile platforms designed for speed, producing materials built for greater durability.</p>}
                    {selectedIndustry === 'Consumer Packaged Goods' && <p>High marks for <span className="font-text-bold pink">Radical Transparency</span> and <span className="font-text-bold pink">Short Supply Chains</span>, reflecting numerous programs to disclose product ingredients and allergens, while addressing more resilient inventory management to address recent supply crisis failures.</p>}
                    {selectedIndustry === 'Food & Beverage' && <p>High marks for <span className="font-text-bold pink">Intelligent Shop Floor</span>, reflecting higher premium on compliance and quality assurance from products that consumer ingest, while safeguarding workplace design for an industry that is still balancing automation versus manual labor processes. </p>}
                    {selectedIndustry === 'Health & Pharma' && <p>High marks for <span className="font-text-bold pink">Radical Transparency</span>, reflecting multi-year development and approval process and most arduous regulatory requirements to disclose potential side-effects and/or drug interactions.</p>}
                    {selectedIndustry === 'Industrial Equipment' && <p>High marks for <span className="font-text-bold pink">Lights-Out, On-Demand</span>, reflecting some of the best case studies for automation, additive manufacturing, and overall visibility of operations from next-gen control towers.</p>}
                    {selectedIndustry === 'Multinationals' && <p>High marks for <span className="font-text-bold pink">Product Passports</span>, reflecting the complexity of the underlying product, as well as the safety and providence of components that support industries with high regulatory scrutiny (spanning Aerospace, Defense, Energy, Medical Devices, etc.).</p>}
                    {selectedIndustry === 'Retail & Grocery' && <p>High marks for <span className="font-text-bold pink">Product Passports</span>, reflecting some of the most detailed product disclosures of ingredients and nutritional value outside Health & Pharma—providing a template for future investments in product impact labels.</p>}
                    {selectedIndustry === 'Technology' && <p>High marks for Integrated Devices and Product Passports, defining the future landscape of the Digital home / body / office landscape, while providing better pathway to identify and mitigate the turnover of hazardous materials introduced by quickly evolving products with short lifespan, high turnover. </p>}                    
                </React.Fragment>  
            }
            {selectedView === 'bubble' ?
                <React.Fragment>
                    <div className="tool-wrapper__sidebar--line"></div>
                    <p>We can also parse each functional area into three essential business benefits (Speed, Cost, Accountability) using our Gameboard framework. </p>                    
                </React.Fragment>
            :
                <React.Fragment>
                    <div className="tool-wrapper__sidebar--line"></div>
                    <p>Across the 21 themes depicted on the Z100 Gameboard, we can gauge an industry’s relative “affinity” for the capabilities and competencies described within, identifying overall strengths (<span className="font-text-bold pink">Hot Spots</span>) and opportunities (<span className="font-text-bold ultraLight">Cold Spots</span>).</p>
                    <p className="italic">For a view of your brand-specific Heatmap, please reach out to your Engagement Manager.</p>
                </React.Fragment>
            }

<div ref={ctaRef} className="flex flex-v-center" onClick={() => { handleViewSelect('heatmap'); showToggleViewCta() }}><div className="cta-btn font-text-bold pointer white flex-v-center flex">SEE GAMEBOARD <img className="cta-btn__arrow" src={RightArrow} /></div> </div>
        </div>
    )
}

export default Sidebar; 