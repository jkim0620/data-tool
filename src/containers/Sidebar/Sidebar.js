import React, { useContext, useRef, useState, useEffect} from 'react'
import Filter from '../Filter/Filter';
import ToolContext from '../../hooks/ToolContext';
import ActiveBubbleBtn from '../../assets/img/toggle_active-circle.svg';
import InactiveBubbleBtn from '../../assets/img/toggle_inactive-circle.svg';
import ActiveHeatmapBtn from '../../assets/img/toggle_active-heatmap.svg';
import InactiveHeatmapBtn from '../../assets/img/toggle_inactive-heatmap.svg';
import RightArrow from '../../assets/img/right-arrow.svg';

const Sidebar = () => {
    const { handleViewSelect, selectedView, selectedIndustry, industryData} = useContext(ToolContext);
    const ctaRef = useRef(),
          toggleRef = useRef(),
          toggleMobileRef = useRef(),
          bubbleIntro = useRef();  

    const [hideHeatmapIntro, setHideHeatmapIntro] = useState(false);

    const handleBtnClick = () => {
        ctaRef.current.className = 'hide';
        toggleRef.current.className = 'flex';                
        bubbleIntro.current.className = 'hide';
    }

    const handleToggleBtnClick = () => {
        setHideHeatmapIntro(true);
    }

    const getValueByLabel = (label) => {
        let getVal;
        industryData.forEach(el => {
            if (el.box_hover === label) {
                getVal = el.score * 100;
            }
        })

        return Math.round(getVal);
    }

    useEffect(() => {
        if (selectedView === 'heatmap') {
            toggleMobileRef.current.className = 'flex';        
        }
    }, [selectedView])
    // handleViewSelect(`${selectedView === 'bubble' ? 'heatmap' : 'bubble'}`);

    return (
        <div className="tool-wrapper__sidebar">            
            <div className="tool-wrapper__sidebar--header">
                <div className="hide flex-v-center" ref={toggleRef}>
                    <div className="font-text-bold white" style={{ paddingTop: '3px' }}>Toggle View</div>
                    <div className="toggle-btn pointer">
                        <img 
                            onClick={() => { selectedView !== 'bubble' && handleViewSelect('bubble') }}
                            style={{width: '50px'}} 
                            onMouseOver={e => (e.currentTarget.src = ActiveBubbleBtn )} 
                            onMouseOut={e => (e.currentTarget.src = `${selectedView === 'bubble' ? ActiveBubbleBtn : InactiveBubbleBtn}` )} 
                            src={`${selectedView === 'bubble' ? ActiveBubbleBtn : InactiveBubbleBtn}`} 
                        />
                        <img 
                            onClick={() => { selectedView !== 'heatmap' && handleViewSelect('heatmap'); !hideHeatmapIntro && selectedView !== 'heatmap' && handleToggleBtnClick(); }}
                            style={{width: '50px'}} 
                            onMouseOver={e => (e.currentTarget.src = ActiveHeatmapBtn )} 
                            onMouseOut={e => (e.currentTarget.src = `${selectedView === 'heatmap' ? ActiveHeatmapBtn : InactiveHeatmapBtn}` )} 
                            src={`${selectedView === 'bubble' ? InactiveHeatmapBtn : ActiveHeatmapBtn}`} 
                        />
                    </div>
                </div>
            </div>

            <div className="tool-wrapper__sidebar--filter">
                <Filter listDirection={'down'} />
            </div>

            <div className="sidebar-mobile"> 
                <div className="sidebar-mobile__filter">
                    <Filter listDirection={'down'} />
                </div>
                <div className="sidebar-mobile__header">
                    <div className="hide" ref={toggleMobileRef} style={{justifyContent: 'end'}}>
                        <div className="font-text-bold white" style={{ paddingTop: '3px', marginRight: '20px' }}>Toggle View</div>
                        <div className="toggle-btn pointer">
                            <img 
                                onClick={() => { selectedView !== 'bubble' && handleViewSelect('bubble') }}
                                style={{width: '50px'}} 
                                src={`${selectedView === 'bubble' ? ActiveBubbleBtn : InactiveBubbleBtn}`} 
                                onMouseOver={e => (e.currentTarget.src = ActiveBubbleBtn )} 
                                onMouseOut={e => (e.currentTarget.src = `${selectedView === 'bubble' ? ActiveBubbleBtn : InactiveBubbleBtn}` )} 
                            />
                            <img 
                                onClick={() => { selectedView !== 'heatmap' && handleViewSelect('heatmap'); !hideHeatmapIntro && selectedView !== 'heatmap' && handleToggleBtnClick(); }}
                                style={{width: '50px'}} 
                                onMouseOver={e => (e.currentTarget.src = ActiveHeatmapBtn )} 
                                onMouseOut={e => (e.currentTarget.src = `${selectedView === 'heatmap' ? ActiveHeatmapBtn : InactiveHeatmapBtn}` )} 
                                src={`${selectedView === 'bubble' ? InactiveHeatmapBtn : ActiveHeatmapBtn}`} 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <p className="tool-wrapper__sidebar--label / ultraLight font-text-bold">Industry Takeaway:</p>            
            {selectedView === 'bubble' ?
                <div className="tool-wrapper__sidebar--desc">
                    {selectedIndustry === 'Athletic Apparel' && <p>The overall imbalance favoring <span className="font-text-bold yolk">Demand-side</span> functions exceeds 2:1 for brands producing “soft goods” where detailed documentation of the <span className="font-text-bold emerald">manufacturing</span> process suffers in favor of product use and sustainability of apparel and footwear with a short, limited lifespan.</p>}
                    {selectedIndustry === 'Automotive' && <p>Among the minority of industries favoring <span className="font-text-bold emerald">Supply-side</span> functions, detailed documentation about <span className="font-text-bold emerald">manufacturing</span> extends to the <span className="font-text-bold emerald">movement</span> of OEM vehicles through a well-established, 3-tier supply chain.</p>}
                    {selectedIndustry === 'Beauty' && <p>Beauty brands register the highest concentration of documentation around <span className="font-text-bold yolk">product use</span> and tie for the lowest documentation on <span className="font-text-bold emerald">sourcing</span>, reflecting a premium on marketing found among luxury and high-end brands.</p>}
                    {selectedIndustry === 'Chemicals & Materials' && <p>Chemical & Material brands register the highest share of documentation in the <span className="font-text-bold yolk">regenerative</span> function, reflecting the need to adhere to regulations governing the disclosure of industrial processes that are potentially harmful to human health and the environment.</p>}
                    {selectedIndustry === 'Consumer Packaged Goods' && <p>In contrast to adjacent industries such as Beauty, CPG brands inspire more documentation around the <span className="font-text-bold emerald">manufacturing</span> process, driven by a need to demonstrate the health and safety of products used with greater frequency by more members of the immediate family.</p>}
                    {selectedIndustry === 'Food & Beverage' && <p>Among the most “balanced” industries across competing functions (with one notable exception), Food & Beverage reflects a wider reliance on indirect distribution channels and wholesalers to <span className="font-text-bold yolk">sell</span> perishable product to consumers.</p>}
                    {selectedIndustry === 'Health & Pharma' && <p>Rivaled only by CPG, Health & Pharma brands demonstrated the largest concentration of documentation specific to <span className="font-text-bold emerald">manufacturing</span>, reflecting the extended 5-step approval process defined by the FDA and other regulatory bodies for product safety monitoring.</p>}
                    {selectedIndustry === 'Industrial Equipment' && <p>In contrast to Automotive brands, Industrial Equipment manufacturers are focused on extending fleet life via <span className="font-text-bold yolk">regenerative</span> mechanisms (repair/refurbish) for product that undergoes fewer changes over longer refresh cycles.</p>}
                    {selectedIndustry === 'Multinationals' && <p>Representing some of the most complex and diversified product assortments (including Aerospace & Defense), Multinational brands have a similar signature to CPG, producing mass documentation on <span className="emerald font-text-bold">manufacturing</span> that served to reinforce reputation, reliability, and safety record.</p>}
                    {selectedIndustry === 'Retail & Grocery' && <p>Apart from select private label brands, Retail & Grocery represents the primary distribution channels for three other industries included in this sample, eclipsing all of them in <span className="font-text-bold yolk">product use</span> by double digits.</p>}
                    {selectedIndustry === 'Technology' && <p>Tech brands are the greatest contributors to overall digital artifacts recorded in our semantic analysis (36% of total results), and their distribution most closely mimics the cross-industry aggregate.</p>}                    
                </div>
                :
                <div className="tool-wrapper__sidebar--desc">
                    {selectedIndustry === 'Athletic Apparel' && <p>High marks for <span className="font-text-bold pink">Smart Networks</span> (<span className="font-text-bold pink">{getValueByLabel('Smart Networks')}%</span>) and <span className="font-text-bold pink">Self-Healing Products</span> (<span className="font-text-bold pink">{getValueByLabel('Self-Healing Products')}%</span>), reflecting long supply chains involving numerous partners and overinvestment in technology that extends the lifespan of high-impact activewear.</p>}
                    {selectedIndustry === 'Automotive' && <p>High marks for <span className="font-text-bold pink">Resilient Sourcing</span> (<span className="font-text-bold pink">{getValueByLabel('Resilient Sourcing')}%</span>) and <span className="font-text-bold pink">ReX Marketplace</span> (<span className="font-text-bold pink">{getValueByLabel('ReX Marketplace')}%</span>), reflecting underlying product complexity and current supply shortages, putting pressure on certified pre-owned (CPO) programs and secondary markets.</p>}
                    {selectedIndustry === 'Beauty' && <p>High marks for <span className="font-text-bold pink">Zero-Waste Ecosystems</span> (<span className="font-text-bold pink">{getValueByLabel('Zero-Waste Ecosystems')}%</span>) and <span className="font-text-bold pink">Resilient Sourcing</span> (<span className="font-text-bold pink">{getValueByLabel('Resilient Sourcing')}%</span>), reflecting customer value generated through perception of ESG commitments and increasing personalization of product assortment.</p>}
                    {selectedIndustry === 'Chemicals & Materials' && <p>High marks for <span className="font-text-bold pink">Self-Healing Products</span> (<span className="font-text-bold pink">{getValueByLabel('Self-Healing Products')}%</span>) and <span className="font-text-bold pink">Flexible Lights-Out</span> (<span className="font-text-bold pink">{getValueByLabel('Flexible Lights-Out')}%</span>), reflecting the industry’s gradual evolution from batch manufacturing towards more agile platforms designed for speed which produce materials built for greater durability.</p>}
                    {selectedIndustry === 'Consumer Packaged Goods' && <p>High marks for <span className="font-text-bold pink">Radical Transparency</span> (<span className="font-text-bold pink">{getValueByLabel('Radical Transparency')}%</span>) and <span className="font-text-bold pink">Fast Fulfillment</span> (<span className="font-text-bold pink">{getValueByLabel('Fast Fulfillment')}%</span>), reflecting numerous programs to disclose product ingredients and allergens, while addressing more resilient inventory management to address recent supply crisis failures.</p>}
                    {selectedIndustry === 'Food & Beverage' && <p>High marks for <span className="font-text-bold pink">Connected Factory</span> (<span className="font-text-bold pink">{getValueByLabel('Connected Factory')}%</span>), reflecting higher premiums on compliance and quality assurance from products that consumers ingest, while safeguarding workplace design for an industry that is still balancing automation versus manual labor processes.</p>}
                    {selectedIndustry === 'Health & Pharma' && <p>High marks for <span className="font-text-bold pink">Radical Transparency</span> (<span className="font-text-bold pink">{getValueByLabel('Radical Transparency')}%</span>), reflecting multi-year development and approval processes and the most arduous regulatory requirements to disclose potential side-effects and/or drug interactions.</p>}
                    {selectedIndustry === 'Industrial Equipment' && <p>High marks for <span className="font-text-bold pink">Connected Factory</span> (<span className="font-text-bold pink">{getValueByLabel('Connected Factory')}%</span>), reflecting some of the best case studies for automation, additive manufacturing, and overall visibility of operations from next-gen control towers.</p>}
                    {selectedIndustry === 'Multinationals' && <p>High marks for <span className="font-text-bold pink">Flexible Lights-Out</span> (<span className="font-text-bold pink">{getValueByLabel('Flexible Lights-Out')}%</span>), reflecting the complexity of the underlying product, as well as the safety and providence of components that support industries with high regulatory scrutiny (spanning Aerospace, Defense, Energy, Medical Devices, etc.).</p>}
                    {selectedIndustry === 'Retail & Grocery' && <p>High marks for <span className="font-text-bold pink">Product Passports</span> (<span className="font-text-bold pink">{getValueByLabel('Product Passports')}%</span>), reflecting some of the most detailed product disclosures of ingredients and nutritional value outside Health & Pharma—providing a template for future investments in product impact labels.</p>}
                    {selectedIndustry === 'Technology' && <p>High marks for <span className="font-text-bold pink">Product Passports</span> (<span className="font-text-bold pink">{getValueByLabel('Product Passports')}%</span>) and <span className="font-text-bold pink">Customer IoT</span> (<span className="font-text-bold pink">{getValueByLabel('Customer IoT')}%</span>), defining the future landscape of Digital home / body / office, while providing a better pathway to identify and mitigate the turnover of hazardous materials introduced by quickly evolving products with short lifespan and high turnover. </p>}                    
                </div>  
            }

            <div className="tool-wrapper__sidebar--add">
                <div className="" ref={bubbleIntro}>
                    <div className="tool-wrapper__sidebar--line"></div>
                    <p>We can also parse each functional area into three essential business benefits (Speed, Cost, Accountability) using our Game Board framework. </p>                    
                </div>
                {selectedView === 'heatmap' &&  
                <React.Fragment>
                    <div className="tool-wrapper__sidebar--line"></div>
                    <p className={`${hideHeatmapIntro ? 'hide' : 'block'}`}>We can gauge an industry’s relative “affinity” for the capabilities and competencies described within, identifying overall strengths (<span className="font-text-bold pink">Hot Spots</span>) and opportunities (<span className="font-text-bold ultraLight">Cold Spots</span>).</p>
                    <p className="italic">For a view of your brand-specific Heatmap, please reach out to your Engagement Director.</p>
                </React.Fragment>
                }            

                <div className="sidebar-mobile__border"></div>

                <div ref={ctaRef} className="gb-cta flex-v-center" onClick={() => { handleViewSelect('heatmap'); handleBtnClick(); }}><div className="cta-btn font-text-bold pointer white flex-v-center flex">SEE GAME BOARD <img className="cta-btn__arrow" src={RightArrow} /></div> </div>            

                {/* <div className="gray" style={{fontSize: '0.8em', marginTop: '50px'}}>Source: Zero100.</div> */}
            </div>
            
            <div className="tool-wrapper__sidebar--border"></div>            
        </div>
    )
}

export default Sidebar; 