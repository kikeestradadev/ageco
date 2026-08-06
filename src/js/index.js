import internalModule from './modules/internalModule';
import styleGuideContainer from './modules/styleGuideContainer';
import siteHeader from './modules/siteHeader';
import perfilDetalle from './modules/perfilDetalle';
import dataTable from './modules/dataTable';
import Prism from 'prismjs';

const initComponents = () => {
	internalModule();
	styleGuideContainer();
	siteHeader();
	perfilDetalle();
	dataTable();
	Prism.highlightAll();
};

document.addEventListener('DOMContentLoaded', initComponents);
