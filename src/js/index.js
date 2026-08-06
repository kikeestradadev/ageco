import internalModule from './modules/internalModule';
import styleGuideContainer from './modules/styleGuideContainer';
import siteHeader from './modules/siteHeader';
import perfilDetalle from './modules/perfilDetalle';
import dataTable from './modules/dataTable';
import entityForm from './modules/entityForm';
import entityList from './modules/entityList';
import Prism from 'prismjs';

const initComponents = async () => {
	internalModule();
	styleGuideContainer();
	siteHeader();
	entityForm();
	await entityList();
	await perfilDetalle();

	// Inicializa tablas que no pasaron por entityList (style guide, reportes, etc.).
	dataTable();
	Prism.highlightAll();
};

document.addEventListener('DOMContentLoaded', () => {
	initComponents().catch((error) => console.error(error));
});
