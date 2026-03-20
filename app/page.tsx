'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Bell, Landmark, Calendar, Network, FileText, Gavel, Map, Loader2, Upload, Settings, HelpCircle, Printer, Search, Filter, X, Menu, Trash2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const paymentData = [
  { id: '001', name: 'ANDERSON MATEUS DE LIMA BARBOSA LTDA', cnpj: '44.629.750/0001-00', item: 'SAL REFINADO GUSTAVO', doc: 'NFE 923', docDate: '21/08/2023', payDoc: 'CH 000000', payDate: '23/08/2023', qty: '2 PC', total: 3.00, fund: 'Estadual' },
  { id: '002', name: 'ANDERSON MATEUS DE LIMA BARBOSA LTDA', cnpj: '44.629.750/0001-00', item: 'OLEO DE SOJA SOYA', doc: 'NFE 923', docDate: '21/08/2023', payDoc: 'CH 000000', payDate: '23/08/2023', qty: '6 UM', total: 57.00, fund: 'Estadual' },
  { id: '003', name: 'ANDERSON MATEUS DE LIMA BARBOSA LTDA', cnpj: '44.629.750/0001-00', item: 'MACARRAO ESPAGUETE', doc: 'NFE 923', docDate: '21/08/2023', payDoc: 'CH 000000', payDate: '23/08/2023', qty: '16 PC', total: 64.00, fund: 'Estadual' },
  { id: '004', name: 'ANDERSON MATEUS DE LIMA BARBOSA LTDA', cnpj: '44.629.750/0001-00', item: 'FRANGO INTEIRO', doc: 'NFE 923', docDate: '21/08/2023', payDoc: 'CH 000000', payDate: '23/08/2023', qty: '125 KG', total: 1862.50, fund: 'Estadual' },
  { id: '005', name: 'ANDERSON MATEUS DE LIMA BARBOSA LTDA', cnpj: '44.629.750/0001-00', item: 'FLOCOS DE MILHO', doc: 'NFE 923', docDate: '21/08/2023', payDoc: 'CH 000000', payDate: '23/08/2023', qty: '106 PC', total: 254.40, fund: 'Estadual' },
  { id: '006', name: 'ANDERSON MATEUS DE LIMA BARBOSA LTDA', cnpj: '44.629.750/0001-00', item: 'EXTRATO DE TOMATE', doc: 'NFE 923', docDate: '21/08/2023', payDoc: 'CH 000000', payDate: '23/08/2023', qty: '7 UM', total: 21.00, fund: 'Estadual' },
  { id: '007', name: 'ANDERSON MATEUS DE LIMA BARBOSA LTDA', cnpj: '44.629.750/0001-00', item: 'CONDIMENTO EM PO', doc: 'NFE 923', docDate: '21/08/2023', payDoc: 'CH 000000', payDate: '23/08/2023', qty: '1 PC', total: 1.20, fund: 'Estadual' },
  { id: '008', name: 'ANDERSON MATEUS DE LIMA BARBOSA LTDA', cnpj: '44.629.750/0001-00', item: 'COLORAU EM PO MARATA', doc: 'NFE 923', docDate: '21/08/2023', payDoc: 'CH 000000', payDate: '23/08/2023', qty: '9 PC', total: 13.50, fund: 'Estadual' },
  { id: '009', name: 'ANDERSON MATEUS DE LIMA BARBOSA LTDA', cnpj: '44.629.750/0001-00', item: 'CARNE MOIDA BOVINA', doc: 'NFE 923', docDate: '21/08/2023', payDoc: 'CH 000000', payDate: '23/08/2023', qty: '14 KG', total: 392.00, fund: 'Estadual' },
  { id: '010', name: 'ANDERSON MATEUS DE LIMA BARBOSA LTDA', cnpj: '44.629.750/0001-00', item: 'ARROZ PARBOILIZADO', doc: 'NFE 923', docDate: '21/08/2023', payDoc: 'CH 000000', payDate: '23/08/2023', qty: '67 PC', total: 368.50, fund: 'Estadual' },
  { id: '011', name: 'ANDERSON MATEUS DE LIMA BARBOSA LTDA', cnpj: '44.629.750/0001-00', item: 'ACUCAR SANTO ANTONIO', doc: 'NFE 923', docDate: '21/08/2023', payDoc: 'CH 000000', payDate: '23/08/2023', qty: '12 PC', total: 56.40, fund: 'Estadual' },
];

const chartData = [
  { name: 'Federal', value: 850400.00, color: '#002045' }, // primary
  { name: 'Estadual', value: 395490.00, color: '#ffb77d' }, // tertiary-fixed-dim
];

const formatCurrency = (value: number | string) => {
  const num = typeof value === 'string' ? parseFloat(value.replace(/\./g, '').replace(',', '.')) : value;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(isNaN(num) ? 0 : num);
};

const formatNumber = (value: number | string) => {
  const num = typeof value === 'string' ? parseFloat(value.replace(/\./g, '').replace(',', '.')) : value;
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(isNaN(num) ? 0 : num);
};

export default function Home() {
  const [payments, setPayments] = useState<typeof paymentData>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const [schoolInfo, setSchoolInfo] = useState({
    name: 'CONSELHO ESCOLAR DA UNIDADE ESCOLAR DR. JOÃO CARVALHO',
    cnpj: '01.919.053/0001-73',
    year: '2023',
    address: 'RUA CÔNEGO CARDOSO, Nº 86.',
    city: 'DOM EXPEDITO LOPES - PI',
    beneficiarySchools: 'UNIDADE ESCOLAR DR. JOÃO CARVALHO'
  });
  const [reportConfig, setReportConfig] = useState({
    period: '01/08/2023 à 28/08/2023',
    installment: '06º REPASSE',
    authDate: 'Dom Expedito Lopes-PI; 06/09/2023',
    depAdm: 'ESTADUAL',
    receivedValue: '',
    investmentYield: '0,00',
    previousBalance: '0,00',
    totalValue: '',
    expensesRealized: '',
    balance: '0,00'
  });

  // Persistence
  useEffect(() => {
    const savedPayments = localStorage.getItem('pnae_payments');
    const savedSchool = localStorage.getItem('pnae_school');
    const savedConfig = localStorage.getItem('pnae_config');
    
    if (savedPayments) {
      try {
        const parsed = JSON.parse(savedPayments);
        if (parsed.length > 0) setPayments(parsed);
        else setPayments(paymentData); // Fallback to mock if empty
      } catch (e) { setPayments(paymentData); }
    } else {
      setPayments(paymentData);
    }
    
    if (savedSchool) try { setSchoolInfo(JSON.parse(savedSchool)); } catch (e) {}
    if (savedConfig) try { setReportConfig(JSON.parse(savedConfig)); } catch (e) {}
  }, []);

  useEffect(() => {
    if (payments.length > 0) localStorage.setItem('pnae_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('pnae_school', JSON.stringify(schoolInfo));
  }, [schoolInfo]);

  useEffect(() => {
    localStorage.setItem('pnae_config', JSON.stringify(reportConfig));
  }, [reportConfig]);
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [isEditingSchool, setIsEditingSchool] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFund, setFilterFund] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState<typeof paymentData[0] | null>(null);
  const [editingInvoicePayment, setEditingInvoicePayment] = useState<{doc: string, payDoc: string, payDate: string} | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const updatePayment = (id: string, updates: Partial<typeof paymentData[0]>) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    if (selectedPayment && selectedPayment.id === id) {
      setSelectedPayment({ ...selectedPayment, ...updates });
    }
  };

  const saveInvoicePayment = () => {
    if (!editingInvoicePayment) return;
    setPayments(prev => prev.map(p => 
      p.doc === editingInvoicePayment.doc 
        ? { ...p, payDoc: editingInvoicePayment.payDoc, payDate: editingInvoicePayment.payDate } 
        : p
    ));
    setEditingInvoicePayment(null);
  };
  const [showFederalTotal, setShowFederalTotal] = useState(false);
  const [showEstadualTotal, setShowEstadualTotal] = useState(false);

  const handleClearData = () => {
    setPayments([]);
    setShowClearConfirm(false);
  };

  // Close sidebar on route change or screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const matchesSearch = payment.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            payment.cnpj.includes(searchTerm) ||
                            payment.item.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFund = filterFund === 'All' || payment.fund === filterFund;
      return matchesSearch && matchesFund;
    });
  }, [searchTerm, filterFund, payments]);

  const totals = useMemo(() => {
    const federal = payments.filter(p => p.fund === 'Federal').reduce((acc, p) => acc + p.total, 0);
    const estadual = payments.filter(p => p.fund === 'Estadual').reduce((acc, p) => acc + p.total, 0);
    return { federal, estadual, total: federal + estadual };
  }, [payments]);

  const dynamicChartData = useMemo(() => [
    { name: 'Federal', value: totals.federal, color: '#002045' },
    { name: 'Estadual', value: totals.estadual, color: '#ffb77d' },
  ], [totals]);

  const parseXML = (xmlText: string, fund: 'Federal' | 'Estadual') => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    // Extraction logic for NF-e XML
    const nNF = xmlDoc.getElementsByTagName("nNF")[0]?.textContent || "S/N";
    const dhEmi = xmlDoc.getElementsByTagName("dhEmi")[0]?.textContent?.split('T')[0] || new Date().toLocaleDateString('pt-BR');
    const xNome = xmlDoc.getElementsByTagName("xNome")[0]?.textContent || "Fornecedor Desconhecido";
    const cnpj = xmlDoc.getElementsByTagName("CNPJ")[0]?.textContent || "00.000.000/0000-00";
    
    // Get all items (det tags)
    const detTags = Array.from(xmlDoc.getElementsByTagName("det"));
    
    if (detTags.length === 0) {
      // Fallback if no det tags found (maybe a different XML format)
      const xProd = xmlDoc.getElementsByTagName("xProd")[0]?.textContent || "Item Diversos";
      const qComRaw = xmlDoc.getElementsByTagName("qCom")[0]?.textContent || "1";
      const qCom = Math.round(parseFloat(qComRaw)).toString();
      const uCom = xmlDoc.getElementsByTagName("uCom")[0]?.textContent || "un";
      const vNF = parseFloat(xmlDoc.getElementsByTagName("vNF")[0]?.textContent || "0");

      const newPayment = {
        id: Math.random().toString(36).substr(2, 9),
        name: xNome,
        cnpj: cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5"),
        item: xProd,
        doc: `NF-e ${nNF} (${cnpj})`,
        docDate: dhEmi.split('-').reverse().join('/'),
        payDoc: `OB ${Math.floor(Math.random() * 90000) + 10000}`,
        payDate: new Date().toLocaleDateString('pt-BR'),
        qty: `${qCom} ${uCom}`,
        total: vNF,
        fund: fund
      };
      setPayments(prev => [...prev, newPayment]);
      return;
    }

    const newPayments = detTags.map((det) => {
      const xProd = det.getElementsByTagName("xProd")[0]?.textContent || "Item Diversos";
      const qComRaw = det.getElementsByTagName("qCom")[0]?.textContent || "1";
      const qCom = Math.round(parseFloat(qComRaw)).toString();
      const uCom = det.getElementsByTagName("uCom")[0]?.textContent || "un";
      const vProd = parseFloat(det.getElementsByTagName("vProd")[0]?.textContent || "0");

      return {
        id: Math.random().toString(36).substr(2, 9),
        name: xNome,
        cnpj: cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5"),
        item: xProd,
        doc: `NF-e ${nNF} (${cnpj})`,
        docDate: dhEmi.split('-').reverse().join('/'),
        payDoc: `OB ${Math.floor(Math.random() * 90000) + 10000}`,
        payDate: new Date().toLocaleDateString('pt-BR'),
        qty: `${qCom} ${uCom}`,
        total: vProd,
        fund: fund
      };
    });

    setPayments(prev => [...prev, ...newPayments]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'Federal' | 'Estadual') => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setIsUploading(true);
      
      let processedCount = 0;
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          try {
            parseXML(text, type);
          } catch (error) {
            console.error("Erro ao processar XML:", error);
          }
          processedCount++;
          if (processedCount === files.length) {
            setIsUploading(false);
            alert(`${files.length} arquivo(s) XML de Repasse ${type} processado(s) com sucesso!`);
          }
        };
        reader.readAsText(file);
      });
      
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <>
      {/* Top Navigation Shell */}
      <header className="bg-[#f8f9ff] dark:bg-[#121c28] fixed top-0 left-0 w-full z-[60] no-print border-b border-[#1A365D]/5">
        <div className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-primary p-1 hover:bg-primary/10 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xl md:text-2xl font-black text-[#1A365D] dark:text-[#ffffff] tracking-tighter flex items-center gap-2">
              <Landmark className="text-primary" size={28} />
              <span className="hidden sm:inline">Portal de Transparência</span>
              <span className="sm:hidden">Portal</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center space-x-8 font-headline font-bold text-lg uppercase tracking-tight">
            <a href="#" className="text-[#121c28]/60 dark:text-[#dfe9fa]/60 font-medium hover:text-[#1A365D] dark:hover:text-[#ffffff] transition-colors duration-200">Painel</a>
            <a href="#" className="text-[#1A365D] dark:text-[#ffffff] border-b-2 border-[#1A365D] pb-1">Relatórios</a>
            <a href="#" className="text-[#121c28]/60 dark:text-[#dfe9fa]/60 font-medium hover:text-[#1A365D] dark:hover:text-[#ffffff] transition-colors duration-200">Auditorias</a>
            <a href="#" className="text-[#121c28]/60 dark:text-[#dfe9fa]/60 font-medium hover:text-[#1A365D] dark:hover:text-[#ffffff] transition-colors duration-200">Arquivos</a>
          </nav>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="text-primary hover:opacity-80 transition-opacity p-2"><Bell size={24} /></button>
            <button className="hidden sm:block text-primary hover:opacity-80 transition-opacity p-2"><Landmark size={24} /></button>
          </div>
        </div>
        <div className="bg-[#eef4ff] dark:bg-[#1d2b3a] h-[1px] w-full"></div>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden no-print"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Shell */}
        <aside className={`h-screen w-64 fixed left-0 top-0 z-50 bg-[#eef4ff] dark:bg-[#121c28] flex flex-col border-r border-[#1A365D]/10 pt-24 no-print overflow-y-auto custom-scrollbar transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="px-6 mb-8">
            <h2 className="font-headline font-extrabold text-[#1A365D] dark:text-[#ffffff] text-xl">Autoridade Financeira</h2>
            <p className="text-xs text-on-surface-variant opacity-70">Relatório Oficial v4.2</p>
          </div>
          
          <nav className="flex-1 space-y-1">
            {/* Mobile-only header links */}
            <div className="lg:hidden border-b border-[#1A365D]/5 mb-2 pb-2">
              <div className="text-[#1A365D] py-2 px-6 font-bold text-xs uppercase tracking-widest opacity-50">Navegação</div>
              <a href="#" className="text-[#121c28]/70 dark:text-[#dfe9fa]/70 py-3 px-6 flex items-center space-x-3 hover:bg-white/50 transition-all">
                <span className="font-body text-sm font-medium tracking-wide">Painel</span>
              </a>
              <a href="#" className="text-[#1A365D] dark:text-[#ffffff] py-3 px-6 flex items-center space-x-3 bg-white/50 transition-all">
                <span className="font-body text-sm font-medium tracking-wide">Relatórios</span>
              </a>
              <a href="#" className="text-[#121c28]/70 dark:text-[#dfe9fa]/70 py-3 px-6 flex items-center space-x-3 hover:bg-white/50 transition-all">
                <span className="font-body text-sm font-medium tracking-wide">Auditorias</span>
              </a>
              <a href="#" className="text-[#121c28]/70 dark:text-[#dfe9fa]/70 py-3 px-6 flex items-center space-x-3 hover:bg-white/50 transition-all">
                <span className="font-body text-sm font-medium tracking-wide">Arquivos</span>
              </a>
            </div>

            <div className="text-[#1A365D] py-2 px-6 font-bold text-xs uppercase tracking-widest opacity-50">Seções do Relatório</div>
            <div className="text-[#121c28]/70 dark:text-[#dfe9fa]/70 py-3 px-6 flex items-center space-x-3 hover:bg-white/50 transition-all cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
              <Calendar size={20} />
              <span className="font-body text-sm font-medium tracking-wide">Bloco I: Período</span>
            </div>
            <div className="text-[#121c28]/70 dark:text-[#dfe9fa]/70 py-3 px-6 flex items-center space-x-3 hover:bg-white/50 transition-all cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
              <Network size={20} />
              <span className="font-body text-sm font-medium tracking-wide">Bloco II: Execução</span>
            </div>
            <div className="bg-white dark:bg-[#1d2b3a] text-[#1A365D] dark:text-[#ffffff] rounded-r-full py-3 px-6 shadow-sm flex items-center space-x-3" onClick={() => setIsSidebarOpen(false)}>
              <FileText size={20} />
              <span className="font-body text-sm font-medium tracking-wide">Bloco III: Resumo</span>
            </div>
            <div className="text-[#121c28]/70 dark:text-[#dfe9fa]/70 py-3 px-6 flex items-center space-x-3 hover:bg-white/50 transition-all cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
              <Gavel size={20} />
              <span className="font-body text-sm font-medium tracking-wide">Fundos Federais</span>
            </div>
            <div className="text-[#121c28]/70 dark:text-[#dfe9fa]/70 py-3 px-6 flex items-center space-x-3 hover:bg-white/50 transition-all cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
              <Map size={20} />
              <span className="font-body text-sm font-medium tracking-wide">Fundos Estaduais</span>
            </div>
          </nav>

          <div className="mt-auto border-t border-[#1A365D]/10 py-4">
            <div className="text-[#121c28]/70 dark:text-[#dfe9fa]/70 py-2 px-6 flex items-center space-x-3 text-sm hover:bg-white/50 transition-all cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
              <Settings size={20} />
              <span>Configurações</span>
            </div>
            <div className="text-[#121c28]/70 dark:text-[#dfe9fa]/70 py-2 px-6 flex items-center space-x-3 text-sm hover:bg-white/50 transition-all cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
              <HelpCircle size={20} />
              <span>Suporte</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 lg:p-12 pb-24 pt-28 print:m-0 print:p-0 print:ml-0 print:w-[297mm]">
          
          {/* Quick Actions Bar (Mobile/Desktop) */}
          <div className="max-w-[1122px] mx-auto mb-8 no-print">
            <div className="bg-surface-container-low p-4 md:p-6 rounded-2xl border border-outline-variant/30 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Upload className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-base text-primary">Importação de Dados</h4>
                  <p className="text-[10px] text-on-surface-variant opacity-70 uppercase tracking-wider">Selecione o arquivo XML da NF-e</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 w-full lg:w-auto justify-center md:justify-end">
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <label className={`w-full bg-primary text-white py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer ${isUploading ? 'opacity-50' : ''}`}>
                    <input type="file" accept=".xml" multiple className="hidden" onChange={(e) => handleFileChange(e, 'Federal')} disabled={isUploading} />
                    {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Landmark size={16} />}
                    <span>Repasse Federal</span>
                  </label>
                  <button 
                    onClick={() => setShowFederalTotal(true)}
                    className="w-full bg-white text-primary py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/5 transition-all border-2 border-primary/20 shadow-sm"
                  >
                    <FileText size={14} />
                    <span>Finalizar Federal</span>
                  </button>
                </div>

                <div className="flex flex-col gap-2 min-w-[200px]">
                  <label className={`w-full bg-tertiary-fixed-dim text-on-tertiary-fixed-variant py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer ${isUploading ? 'opacity-50' : ''}`}>
                    <input type="file" accept=".xml" multiple className="hidden" onChange={(e) => handleFileChange(e, 'Estadual')} disabled={isUploading} />
                    {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Map size={16} />}
                    <span>Repasse Estadual</span>
                  </label>
                  <button 
                    onClick={() => setShowEstadualTotal(true)}
                    className="w-full bg-white text-on-tertiary-fixed-variant py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-tertiary-fixed-dim/5 transition-all border-2 border-tertiary-fixed-dim/20 shadow-sm"
                  >
                    <FileText size={14} />
                    <span>Finalizar Estadual</span>
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => setIsEditingSchool(true)}
                    className="bg-secondary-container text-on-secondary-container py-3 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-secondary hover:text-white active:scale-95 transition-all cursor-pointer border border-secondary/20 h-[46px]"
                  >
                    <Settings size={14} />
                    <span>Escola</span>
                  </button>
                  <button 
                    onClick={() => setIsEditingConfig(true)}
                    className="bg-tertiary-container text-on-tertiary-container py-3 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-tertiary hover:text-white active:scale-95 transition-all cursor-pointer border border-tertiary/20 h-[46px]"
                  >
                    <Calendar size={14} />
                    <span>Config</span>
                  </button>
                  <button 
                    onClick={() => setShowClearConfirm(true)}
                    className="bg-error-container text-on-error-container py-3 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-error hover:text-white active:scale-95 transition-all cursor-pointer border border-error/20 h-[46px]"
                  >
                    <Trash2 size={14} />
                    <span>Limpar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Totals Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Total Federal</p>
                  <h3 className="text-xl font-black text-primary">{formatCurrency(totals.federal)}</h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Landmark size={20} className="text-primary" />
                </div>
              </div>
              <div className="bg-tertiary/5 border border-tertiary/10 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Total Estadual</p>
                  <h3 className="text-xl font-black text-tertiary">{formatCurrency(totals.estadual)}</h3>
                </div>
                <div className="bg-tertiary/10 p-2 rounded-lg">
                  <Map size={20} className="text-tertiary" />
                </div>
              </div>
              <div className="bg-secondary/5 border border-secondary/10 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Total Geral</p>
                  <h3 className="text-xl font-black text-secondary">{formatCurrency(totals.total)}</h3>
                </div>
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <FileText size={20} className="text-secondary" />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto pb-12 -mx-4 px-4 md:mx-0 md:px-0 custom-scrollbar print:overflow-visible print:m-0 print:p-0 print:block">
            <div className="min-w-[1122px] mx-auto space-y-8 print:min-w-0 print:w-full print:m-0 print:block print:space-y-0">
              {(() => {
                let globalPageCounter = 0;
                const federalPayments = payments.filter(p => p.fund === 'Federal');
                const estadualPayments = payments.filter(p => p.fund === 'Estadual');
                const totalGeral = payments.reduce((acc, p) => acc + p.total, 0);

                const federalInvoices = federalPayments.reduce((acc, p) => {
                  if (!acc[p.doc]) acc[p.doc] = [];
                  acc[p.doc].push(p);
                  return acc;
                }, {} as Record<string, typeof federalPayments>);
                const estadualInvoices = estadualPayments.reduce((acc, p) => {
                  if (!acc[p.doc]) acc[p.doc] = [];
                  acc[p.doc].push(p);
                  return acc;
                }, {} as Record<string, typeof estadualPayments>);

                const federalInvoiceEntries = Object.entries(federalInvoices);
                const estadualInvoiceEntries = Object.entries(estadualInvoices);
                const totalPages = federalInvoiceEntries.length + estadualInvoiceEntries.length;

                return ['Federal', 'Estadual'].map((fund, fundIdx) => {
                  const fundPayments = fund === 'Federal' ? federalPayments : estadualPayments;
                  const fundTotal = fundPayments.reduce((acc, p) => acc + p.total, 0);
                  const isVisibleOnScreen = filterFund === 'All' || filterFund === fund;
                  if (fundPayments.length === 0) return null;

                  const invoiceEntries = fund === 'Federal' ? federalInvoiceEntries : estadualInvoiceEntries;

                  return (
                    <div key={fund} className="space-y-0">
                      {invoiceEntries.map(([docNum, invoicePayments], invoiceIdx) => {
                        globalPageCounter++;
                        const currentPage = globalPageCounter;
                        const invoiceTotal = invoicePayments.reduce((acc, p) => acc + p.total, 0);
                        const firstPay = invoicePayments[0];
                        const isFirstPageOfDoc = currentPage === 1;
                        const isLastPageOfFund = invoiceIdx === invoiceEntries.length - 1;
                        const isLastPageOfDoc = currentPage === totalPages;

                        return (
                          <div key={docNum} className={`${isVisibleOnScreen ? 'flex' : 'hidden print:flex'} print-container bg-white text-black shadow-xl p-8 w-[1122px] min-h-[794px] flex flex-col border border-black font-serif relative print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:min-h-0 print:break-after-page`}>
                            {/* Watermark for preview */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none no-print">
                              <div className="text-[120px] font-black rotate-[-35deg] border-8 border-black p-10">PAISAGEM</div>
                            </div>
                            
                            {/* Document Header */}
                            <div className="flex justify-between items-start border-b border-black pb-1 mb-1">
                              <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center">
                                  <div className="w-16 h-16 border border-black rounded-full flex flex-col items-center justify-center text-[8px] font-bold text-center leading-tight p-1">
                                    <span>MERENDA</span>
                                    <span>ESCOLAR</span>
                                  </div>
                                  <span className="text-[8px] font-bold mt-0.5">efetuados</span>
                                </div>
                                <div className="text-left space-y-0.5">
                                  <p className="text-[11px] font-bold uppercase leading-tight">SECRETARIA ESTADUAL DE EDUCAÇÃO</p>
                                  <p className="text-[11px] font-bold uppercase leading-tight">FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO</p>
                                  <p className="text-[11px] font-bold uppercase leading-tight">ESCOLARIZAÇÃO DA MERENDA ESCOLAR</p>
                                </div>
                              </div>
                              <div className="text-right flex flex-col justify-between h-20">
                                <p className="text-[14px] font-bold uppercase">PRESTAÇÃO DE CONTAS</p>
                                <div className="text-[9px] leading-tight font-bold">
                                  <p>Demonstrativos da execução da receita e da despesa e relação</p>
                                  <p>de pagamentos</p>
                                </div>
                              </div>
                            </div>

                            {/* Bloco I and II - Only on the very first page of the document */}
                            {isFirstPageOfDoc && (
                              <>
                                {/* Bloco I */}
                                <div 
                                  className="mb-1 cursor-pointer no-print-hover transition-colors rounded-sm" 
                                  onClick={() => setIsEditingSchool(true)}
                                  title="Clique para editar Bloco I"
                                >
                                  <p className="text-[10px] font-bold mb-0.5">Bloco I – Identificação da Unidade Executora e da(s) Escola (s) beneficiada(s)</p>
                                  <div className="grid grid-cols-12 border-t border-l border-black">
                                    <div className="col-span-6 border-r border-b border-black p-1">
                                      <label className="block text-[7px] font-bold">01-Nome da Unidade Executora (Conselho Escolar,Etc)</label>
                                      <p className="text-[9px] font-bold uppercase">{schoolInfo.name}</p>
                                    </div>
                                    <div className="col-span-4 border-r border-b border-black p-1">
                                      <label className="block text-[7px] font-bold">02- Nº CNPJ</label>
                                      <p className="text-[9px] font-bold">{schoolInfo.cnpj}</p>
                                    </div>
                                    <div className="col-span-2 border-r border-b border-black p-1">
                                      <label className="block text-[7px] font-bold">03-Exercício</label>
                                      <p className="text-[9px] font-bold text-center">{schoolInfo.year}</p>
                                    </div>
                                    
                                    <div className="col-span-6 border-r border-b border-black p-1">
                                      <label className="block text-[7px] font-bold">04 – NOME DA(S) ESCOLA(S) BENEFICIADO</label>
                                      <p className="text-[9px] font-bold uppercase">{schoolInfo.beneficiarySchools}</p>
                                    </div>
                                    <div className="col-span-1 border-r border-b border-black p-1">
                                      <label className="block text-[7px] font-bold">05 – DEP. ADM. ESTADUAL</label>
                                      <p className="text-[8px] font-bold uppercase">{reportConfig.depAdm}</p>
                                    </div>
                                    <div className="col-span-3 border-r border-b border-black p-1">
                                      <label className="block text-[7px] font-bold">06 – ENDEREÇO</label>
                                      <p className="text-[8px] font-bold uppercase">{schoolInfo.address}</p>
                                    </div>
                                    <div className="col-span-2 border-r border-b border-black p-1">
                                      <label className="block text-[7px] font-bold">07 – MUNICÍPIO</label>
                                      <p className="text-[8px] font-bold uppercase">{schoolInfo.city}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Bloco II */}
                                <div 
                                  className="mb-1 cursor-pointer no-print-hover transition-colors rounded-sm"
                                  onClick={() => setIsEditingConfig(true)}
                                  title="Clique para editar Bloco II"
                                >
                                  <p className="text-[10px] font-bold mb-0.5">Bloco II – Síntese da receita e da despesa</p>
                                  <div className="grid grid-cols-8 border-t border-l border-black text-center">
                                    <div className="border-r border-b border-black p-1">
                                      <label className="block text-[6px] font-bold leading-tight">08 – REC. VAL. RECEBIDO</label>
                                      <p className="text-[8px] font-bold">R$ {reportConfig.receivedValue || formatNumber(totalGeral)}</p>
                                    </div>
                                    <div className="border-r border-b border-black p-1">
                                      <label className="block text-[6px] font-bold leading-tight">09 – REND. APLICAÇAO</label>
                                      <p className="text-[8px] font-bold">R$ {reportConfig.investmentYield}</p>
                                    </div>
                                    <div className="border-r border-b border-black p-1">
                                      <label className="block text-[6px] font-bold leading-tight">10 – SALDO ANTERIOR</label>
                                      <p className="text-[8px] font-bold">R$ {reportConfig.previousBalance}</p>
                                    </div>
                                    <div className="border-r border-b border-black p-1">
                                      <label className="block text-[6px] font-bold leading-tight">11 – VALOR TOTAL</label>
                                      <p className="text-[8px] font-bold">R$ {reportConfig.totalValue || formatNumber(totalGeral)}</p>
                                    </div>
                                    <div className="border-r border-b border-black p-1">
                                      <label className="block text-[6px] font-bold leading-tight">12 – DESP. REALIZADAS</label>
                                      <p className="text-[8px] font-bold">R$ {reportConfig.expensesRealized || formatNumber(totalGeral)}</p>
                                    </div>
                                    <div className="border-r border-b border-black p-1">
                                      <label className="block text-[6px] font-bold leading-tight">13 – SALDO</label>
                                      <p className="text-[8px] font-bold">R$ {reportConfig.balance}</p>
                                    </div>
                                    <div className="border-r border-b border-black p-1">
                                      <label className="block text-[6px] font-bold leading-tight uppercase">14–PERÍODO DE EXECUSSÃO</label>
                                      <p className="text-[7px] font-bold">{reportConfig.period}</p>
                                    </div>
                                    <div className="border-r border-b border-black p-1">
                                      <label className="block text-[6px] font-bold leading-tight uppercase">15-PARCELA Nº</label>
                                      <p className="text-[7px] font-bold uppercase">{reportConfig.installment}</p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                            {/* Bloco III */}
                            <div className="flex-1 space-y-2">
                              <p className="text-[10px] font-bold mb-0.5">Bloco III – Pagamentos efetuados</p>
                              <div className="border-t border-l border-black">
                                <table className="w-full border-collapse text-[7px]">
                                  <thead>
                                    <tr className="text-center font-bold uppercase text-[8px]">
                                      <th rowSpan={2} className="border-r border-b border-black w-8 p-1">16 –<br/>ITEM</th>
                                      <th rowSpan={2} className="border-r border-b border-black p-1 w-1/4 text-left align-top">
                                        <div className="text-[8px] font-bold">17 - NOME DO FAVORECIDO E CPF/CNPJ</div>
                                        <div className="text-[9px] mt-1 font-bold">
                                          {firstPay?.name}<br/>
                                          CNPJ: {firstPay?.cnpj}
                                        </div>
                                      </th>
                                      <th rowSpan={2} className="border-r border-b border-black p-1 w-1/4 text-left align-top text-[8px] font-bold">18 - NOME DO GÊNERO ALIMENTÍCIO</th>
                                      <th colSpan={3} className="border-r border-b border-black p-1 text-[9px] font-bold">19 - DOCUMENTO</th>
                                      <th colSpan={2} className="border-r border-b border-black p-1 text-[9px] font-bold">20 - PAGAMENTO</th>
                                      <th rowSpan={2} className="border-r border-b border-black p-1 w-24 text-[8px] font-bold">
                                        <div>21 – QUANTIDADE</div>
                                        <div className="text-[6px] font-normal mt-0.5">KG. LT , UN. Etc.</div>
                                      </th>
                                      <th colSpan={2} className="border-r border-b border-black p-1 text-[9px] font-bold">22 – VALOR (R$) 1,00</th>
                                    </tr>
                                    <tr className="text-center font-bold uppercase text-[7px]">
                                      <th className="border-r border-b border-black p-1 w-12">
                                        <div className="flex flex-col items-center justify-center leading-tight">
                                          <span className="text-[6px]">TIPO</span>
                                          <span className="text-[10px]">{firstPay?.doc.includes(' ') ? firstPay?.doc.split(' ')[0] : 'NFE'}</span>
                                        </div>
                                      </th>
                                      <th className="border-r border-b border-black p-1 w-16">
                                        <div className="flex flex-col items-center justify-center leading-tight">
                                          <span className="text-[6px]">NÚMERO</span>
                                          <span className="text-[10px]">{firstPay?.doc.includes('NF-e') ? firstPay?.doc.split(' ')[1] : firstPay?.doc}</span>
                                        </div>
                                      </th>
                                      <th className="border-r border-b border-black p-1 w-20">
                                        <div className="flex flex-col items-center justify-center leading-tight">
                                          <span className="text-[6px]">DATA</span>
                                          <span className="text-[10px]">{firstPay?.docDate}</span>
                                        </div>
                                      </th>
                                      <th 
                                        className="border-r border-b border-black p-1 w-16 cursor-pointer no-print-hover transition-colors rounded-sm"
                                        onClick={() => setEditingInvoicePayment({ doc: firstPay?.doc || '', payDoc: firstPay?.payDoc || '', payDate: firstPay?.payDate || '' })}
                                        title="Clique para editar pagamento"
                                      >
                                        <div className="flex flex-col items-center justify-center leading-tight">
                                          <span className="text-[6px]">Nº CH./OB</span>
                                          <span className="text-[10px]">{firstPay?.payDoc.includes('000000') ? '' : (firstPay?.payDoc.includes(' ') ? firstPay?.payDoc.split(' ')[1] : firstPay?.payDoc)}</span>
                                        </div>
                                      </th>
                                      <th 
                                        className="border-r border-b border-black p-1 w-20 cursor-pointer no-print-hover transition-colors rounded-sm"
                                        onClick={() => setEditingInvoicePayment({ doc: firstPay?.doc || '', payDoc: firstPay?.payDoc || '', payDate: firstPay?.payDate || '' })}
                                        title="Clique para editar data de pagamento"
                                      >
                                        <div className="flex flex-col items-center justify-center leading-tight">
                                          <span className="text-[6px]">DATA</span>
                                          <span className="text-[10px]">{firstPay?.payDate}</span>
                                        </div>
                                      </th>
                                      <th className="border-r border-b border-black p-1 w-20">VL. UNITÁRIO</th>
                                      <th className="border-b border-black p-1 w-24">VALOR TOTAL</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {invoicePayments.map((payment, pIdx) => {
                                      return (
                                        <tr 
                                          key={payment.id} 
                                          className="text-center cursor-pointer no-print-hover transition-colors"
                                          onClick={() => setSelectedPayment(payment)}
                                          title="Clique para ver ou editar detalhes"
                                        >
                                          <td className="border-r border-b border-black p-1 text-[11px] font-bold">{pIdx + 1}</td>
                                          <td className="border-r border-b border-black p-1"></td>
                                          <td className="border-r border-b border-black p-1 text-left uppercase text-[11px] font-bold">
                                            {payment.item}
                                          </td>
                                          <td className="border-r border-b border-black p-1"></td>
                                          <td className="border-r border-b border-black p-1"></td>
                                          <td className="border-r border-b border-black p-1"></td>
                                          <td className="border-r border-b border-black p-1"></td>
                                          <td className="border-r border-b border-black p-1"></td>
                                          <td className="border-r border-b border-black p-1 text-center font-bold text-[11px]">
                                            <div className="flex justify-center gap-4">
                                              <span>{Math.round(parseFloat(payment.qty.split(' ')[0]))}</span>
                                              <span className="uppercase">{payment.qty.split(' ')[1]}</span>
                                            </div>
                                          </td>
                                          <td className="border-r border-b border-black p-1 text-center font-bold text-[11px]">
                                            {formatNumber(payment.total / (parseFloat(payment.qty) || 1))}
                                          </td>
                                          <td className="border-b border-black p-1 text-center font-bold text-[11px]">
                                            {formatNumber(payment.total)}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                    {/* Fill empty rows to reach at least 15 items if it's a short page */}
                                    {invoicePayments.length < 15 && Array.from({ length: 15 - invoicePayments.length }).map((_, i) => (
                                      <tr key={`empty-${i}`} className="h-8">
                                        <td className="border-r border-b border-black p-1 text-[11px] font-bold">{invoicePayments.length + i + 1}</td>
                                        <td className="border-r border-b border-black p-1"></td>
                                        <td className="border-r border-b border-black p-1"></td>
                                        <td className="border-r border-b border-black p-1"></td>
                                        <td className="border-r border-b border-black p-1"></td>
                                        <td className="border-r border-b border-black p-1"></td>
                                        <td className="border-r border-b border-black p-1"></td>
                                        <td className="border-r border-b border-black p-1"></td>
                                        <td className="border-r border-b border-black p-1"></td>
                                        <td className="border-r border-b border-black p-1"></td>
                                        <td className="border-b border-black p-1"></td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <tfoot>
                                    <tr className="font-bold uppercase text-[10px]">
                                      <td className="border-r border-b border-black p-1"></td>
                                      <td colSpan={9} className="border-r border-b border-black p-1 text-left">TOTAL PARCIAL {currentPage.toString().padStart(2, '0')}</td>
                                      <td className="border-b border-black p-1 text-center">{formatNumber(invoiceTotal)}</td>
                                    </tr>
                                    {isLastPageOfFund && (
                                      <tr className="font-bold uppercase text-[11px] bg-gray-50">
                                        <td className="border-r border-b border-black p-1"></td>
                                        <td colSpan={9} className="border-r border-b border-black p-1 text-left">TOTAL {fund.toUpperCase()}</td>
                                        <td className="border-b border-black p-1 text-center text-[13px]">{formatNumber(fundTotal)}</td>
                                      </tr>
                                    )}
                                    {isLastPageOfDoc && (
                                      <tr className="font-bold uppercase text-[12px] bg-gray-100">
                                        <td className="border-r border-b border-black p-1"></td>
                                        <td colSpan={9} className="border-r border-b border-black p-1 text-left">TOTAL GERAL</td>
                                        <td className="border-b border-black p-1 text-center text-[14px]">{formatNumber(totalGeral)}</td>
                                      </tr>
                                    )}
                                  </tfoot>
                                </table>
                              </div>

                              {/* Signature Section - Only on the very last page of the document */}
                              {isLastPageOfDoc && (
                                <div className="mt-4">
                                  <p className="text-[8px] font-bold mb-2">OBS. ACOMPANHA ESTA PRESTAÇÃO DE CONTAS, OFÍCIO DE ENCAMINHAMENTO DA PRESTAÇÃO DE CONTAS, EXTRATO BANCÁRIO, PARECER DO CONSELHO E COMPROVANTES DE DESPESAS.</p>
                                  <div className="grid grid-cols-2 border border-black">
                                    <div className="border-r border-black p-3 flex flex-col justify-between">
                                      <div className="flex gap-1 items-baseline">
                                        <span className="text-[9px] font-bold">23 – AUTENTICAÇÃO:</span>
                                        <span className="text-[10px] font-bold underline">{reportConfig.authDate}</span>
                                      </div>
                                      <span className="text-[8px] font-bold text-center mt-2">Local e Data</span>
                                    </div>
                                    <div className="p-3 flex flex-col items-center justify-end">
                                      <div className="border-t border-black w-full mb-1"></div>
                                      <span className="text-[8px] font-bold text-center">Nome e Ass. Do Dirigente ou Seu Representante Legal</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                });
              })()}
          </div>
        </div>
      </main>
    </div>

      {/* Global Footer Shell */}
      <footer className="bg-[#f8f9ff] dark:bg-[#0a0f16] w-full py-8 mt-auto border-t border-[#1A365D]/5 no-print">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-screen-2xl mx-auto">
          <div className="font-body text-xs uppercase tracking-widest opacity-50 text-[#1A365D] dark:text-[#dfe9fa] mb-4 md:mb-0">
            © 2024 Portal de Transparência - Controle de Contas Públicas
          </div>
          <div className="flex gap-8">
            <a href="#" className="font-body text-xs uppercase tracking-widest opacity-50 text-[#1A365D] dark:text-[#dfe9fa] hover:underline underline-offset-4">Privacidade de Dados</a>
            <a href="#" className="font-body text-xs uppercase tracking-widest opacity-50 text-[#1A365D] dark:text-[#dfe9fa] hover:underline underline-offset-4">Protocolo de Auditoria</a>
            <a href="#" className="font-body text-xs uppercase tracking-widest opacity-50 text-[#1A365D] dark:text-[#dfe9fa] hover:underline underline-offset-4">Portal Institucional</a>
          </div>
        </div>
      </footer>

      {/* Print Floating Action */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end gap-3 no-print z-[100]">
        <div className="hidden md:block bg-surface-container-high p-3 rounded-xl shadow-xl border border-outline-variant/30 text-[10px] font-bold text-primary uppercase tracking-widest animate-bounce">
          Dica: Use &quot;Salvar como PDF&quot; no diálogo de impressão
        </div>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => {
              window.open(window.location.href, '_blank');
            }} 
            className="bg-white dark:bg-[#1d2b3a] text-primary p-4 md:p-5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all border-4 border-primary/20"
            title="Abrir em nova aba para melhor impressão"
          >
            <Network size={20} className="md:w-6 md:h-6" />
          </button>
          <button 
            type="button"
            onClick={() => {
              console.log("Iniciando impressão...");
              window.print();
            }} 
            className="bg-primary text-white p-4 md:p-5 rounded-full shadow-[0_20px_50px_rgba(0,32,69,0.3)] hover:scale-110 active:scale-95 transition-all flex items-center space-x-2 md:space-x-3 border-4 border-white dark:border-[#121c28]"
          >
            <Printer size={20} className="md:w-6 md:h-6" />
            <span className="font-bold text-sm md:text-lg pr-2">Gerar Demonstrativo</span>
          </button>
        </div>
      </div>

      {/* Finalize Federal Modal */}
      <AnimatePresence>
        {showFederalTotal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 no-print"
            onClick={() => setShowFederalTotal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-primary/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-primary p-6 text-white text-center">
                <Landmark size={48} className="mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-headline font-bold">Resumo Repasse Federal</h3>
              </div>
              <div className="p-8 text-center">
                <p className="text-on-surface-variant mb-2 uppercase tracking-widest text-xs font-bold">Total Acumulado</p>
                <div className="text-4xl font-headline font-black text-primary mb-6">
                  {formatCurrency(totals.federal)}
                </div>
                <div className="bg-primary/5 rounded-2xl p-4 mb-6 border border-primary/10">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-70">Itens Processados:</span>
                    <span className="font-bold">{payments.filter(p => p.fund === 'Federal').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Status:</span>
                    <span className="font-bold text-emerald-600">Concluído</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowFederalTotal(false)}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                >
                  Fechar Resumo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Finalize Estadual Modal */}
      <AnimatePresence>
        {showEstadualTotal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 no-print"
            onClick={() => setShowEstadualTotal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-tertiary/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-tertiary-fixed-dim p-6 text-on-tertiary-fixed-variant text-center">
                <Map size={48} className="mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-headline font-bold">Resumo Repasse Estadual</h3>
              </div>
              <div className="p-8 text-center">
                <p className="text-on-surface-variant mb-2 uppercase tracking-widest text-xs font-bold">Total Acumulado</p>
                <div className="text-4xl font-headline font-black text-tertiary mb-6">
                  {formatCurrency(totals.estadual)}
                </div>
                <div className="bg-tertiary/5 rounded-2xl p-4 mb-6 border border-tertiary/10">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-70">Itens Processados:</span>
                    <span className="font-bold">{payments.filter(p => p.fund === 'Estadual').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Status:</span>
                    <span className="font-bold text-emerald-600">Concluído</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEstadualTotal(false)}
                  className="w-full bg-tertiary-fixed-dim text-on-tertiary-fixed-variant py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                >
                  Fechar Resumo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {/* School Info Modal */}
        {isEditingSchool && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 no-print"
            onClick={() => setIsEditingSchool(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-primary/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline font-black text-2xl text-primary uppercase tracking-tighter">Dados da Unidade Executora</h3>
                  <button onClick={() => setIsEditingSchool(false)} className="text-on-surface-variant hover:text-primary transition-colors">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Nome da Unidade Executora</label>
                    <input 
                      type="text" 
                      value={schoolInfo.name}
                      onChange={(e) => setSchoolInfo({...schoolInfo, name: e.target.value})}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Nome da(s) Escola(s) Beneficiada(s)</label>
                    <input 
                      type="text" 
                      value={schoolInfo.beneficiarySchools}
                      onChange={(e) => setSchoolInfo({...schoolInfo, beneficiarySchools: e.target.value})}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase mb-1">CNPJ</label>
                      <input 
                        type="text" 
                        value={schoolInfo.cnpj}
                        onChange={(e) => setSchoolInfo({...schoolInfo, cnpj: e.target.value})}
                        className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase mb-1">Exercício</label>
                      <input 
                        type="text" 
                        value={schoolInfo.year}
                        onChange={(e) => setSchoolInfo({...schoolInfo, year: e.target.value})}
                        className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Endereço</label>
                    <input 
                      type="text" 
                      value={schoolInfo.address}
                      onChange={(e) => setSchoolInfo({...schoolInfo, address: e.target.value})}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Município - UF</label>
                    <input 
                      type="text" 
                      value={schoolInfo.city}
                      onChange={(e) => setSchoolInfo({...schoolInfo, city: e.target.value})}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">05 – DEP. ADM. ESTADUAL</label>
                    <input 
                      type="text" 
                      value={reportConfig.depAdm}
                      onChange={(e) => setReportConfig({...reportConfig, depAdm: e.target.value})}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsEditingSchool(false)}
                  className="w-full mt-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                >
                  Salvar Alterações
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Report Config Modal */}
        {isEditingConfig && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 no-print"
            onClick={() => setIsEditingConfig(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-tertiary/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline font-black text-2xl text-primary uppercase tracking-tighter">Configurações do Relatório</h3>
                  <button onClick={() => setIsEditingConfig(false)} className="text-on-surface-variant hover:text-primary transition-colors">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Período de Execução</label>
                    <input 
                      type="text" 
                      placeholder="Ex: 01/08/2023 à 28/08/2023"
                      value={reportConfig.period}
                      onChange={(e) => setReportConfig({...reportConfig, period: e.target.value})}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Parcela Nº</label>
                    <input 
                      type="text" 
                      placeholder="Ex: 06º REPASSE"
                      value={reportConfig.installment}
                      onChange={(e) => setReportConfig({...reportConfig, installment: e.target.value})}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase mb-1">08 – REC. VAL. RECEBIDO</label>
                      <input 
                        type="text" 
                        placeholder="Deixe vazio para automático"
                        value={reportConfig.receivedValue}
                        onChange={(e) => setReportConfig({...reportConfig, receivedValue: e.target.value})}
                        className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase mb-1">09 – REND. APLICAÇAO</label>
                      <input 
                        type="text" 
                        value={reportConfig.investmentYield}
                        onChange={(e) => setReportConfig({...reportConfig, investmentYield: e.target.value})}
                        className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase mb-1">10 – SALDO ANTERIOR</label>
                      <input 
                        type="text" 
                        value={reportConfig.previousBalance}
                        onChange={(e) => setReportConfig({...reportConfig, previousBalance: e.target.value})}
                        className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase mb-1">11 – VALOR TOTAL</label>
                      <input 
                        type="text" 
                        placeholder="Deixe vazio para automático"
                        value={reportConfig.totalValue}
                        onChange={(e) => setReportConfig({...reportConfig, totalValue: e.target.value})}
                        className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase mb-1">12 – DESP. REALIZADAS</label>
                      <input 
                        type="text" 
                        placeholder="Deixe vazio para automático"
                        value={reportConfig.expensesRealized}
                        onChange={(e) => setReportConfig({...reportConfig, expensesRealized: e.target.value})}
                        className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase mb-1">13 – SALDO</label>
                      <input 
                        type="text" 
                        value={reportConfig.balance}
                        onChange={(e) => setReportConfig({...reportConfig, balance: e.target.value})}
                        className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Autenticação (Local e Data)</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Dom Expedito Lopes-PI; 06/09/2023"
                      value={reportConfig.authDate}
                      onChange={(e) => setReportConfig({...reportConfig, authDate: e.target.value})}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsEditingConfig(false)}
                  className="w-full mt-8 py-4 bg-tertiary text-on-tertiary font-bold rounded-2xl shadow-lg shadow-tertiary/20 hover:bg-tertiary/90 transition-all active:scale-95"
                >
                  Salvar Configurações
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showClearConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 no-print"
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-error/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 text-center">
                <div className="bg-error/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="text-error" size={40} />
                </div>
                <h3 className="font-headline font-black text-2xl text-primary mb-3 uppercase tracking-tighter">Limpar Todos os Dados?</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                  Esta ação irá remover permanentemente todos os registros de pagamentos importados. Você terá que subir os arquivos XML novamente para gerar um novo demonstrativo.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 px-6 py-4 bg-surface-container-high hover:bg-surface-variant text-on-surface font-bold rounded-2xl transition-all active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleClearData}
                    className="flex-1 px-6 py-4 bg-error text-white font-bold rounded-2xl shadow-lg shadow-error/20 hover:bg-error/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Confirmar Limpeza
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Details Modal */}
      <AnimatePresence>
        {selectedPayment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 no-print"
            onClick={() => setSelectedPayment(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-outline-variant/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-6 text-white flex justify-between items-start ${selectedPayment.fund === 'Federal' ? 'bg-primary' : 'bg-tertiary-fixed-dim'}`}>
                <div>
                  <h3 className="font-headline font-black text-2xl mb-1 uppercase tracking-tighter">{selectedPayment.name}</h3>
                  <p className="text-sm opacity-80 font-medium tracking-tight">CNPJ: {selectedPayment.cnpj}</p>
                </div>
                <button onClick={() => setSelectedPayment(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Detalhes do Item</h4>
                  <p className="font-medium text-lg mb-6 text-on-surface leading-tight">{selectedPayment.item}</p>
                  
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Quantidade</h4>
                  <p className="font-medium text-lg mb-6 text-on-surface">
                    {Math.round(parseFloat(selectedPayment.qty.split(' ')[0]))} {selectedPayment.qty.split(' ')[1]}
                  </p>
                  
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Fundo de Repasse</h4>
                  <span className={`inline-block px-4 py-1.5 text-xs font-black rounded-full uppercase tracking-tighter ${selectedPayment.fund === 'Federal' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-tertiary-fixed/30 text-on-tertiary-fixed-variant border border-tertiary-fixed-dim/20'}`}>
                    {selectedPayment.fund}
                  </span>
                </div>
                <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">Documento Fiscal</h4>
                    <div className="space-y-2">
                      <p className="font-bold text-on-surface">{selectedPayment.doc}</p>
                      <p className="text-sm text-on-surface-variant font-medium">{selectedPayment.docDate}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/30">
                    <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">Ordem de Pagamento (Editável)</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[9px] font-bold text-on-surface-variant uppercase mb-1">Nº CH./OB</label>
                        <input 
                          type="text" 
                          value={selectedPayment.payDoc}
                          onChange={(e) => updatePayment(selectedPayment.id, { payDoc: e.target.value })}
                          className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-on-surface-variant uppercase mb-1">Data do Pagamento</label>
                        <input 
                          type="text" 
                          value={selectedPayment.payDate}
                          onChange={(e) => updatePayment(selectedPayment.id, { payDate: e.target.value })}
                          className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/30">
                    <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Valor Total</h4>
                    <p className="font-headline font-black text-3xl text-primary">{formatCurrency(selectedPayment.total)}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-container-highest border-t border-outline-variant/20 flex justify-end">
                <button 
                  onClick={() => setSelectedPayment(null)}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                >
                  Concluir Edição
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Invoice Payment Modal */}
      <AnimatePresence>
        {editingInvoicePayment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 no-print"
            onClick={() => setEditingInvoicePayment(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-primary/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-primary p-6 text-white text-center">
                <Landmark size={48} className="mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-headline font-bold uppercase tracking-tighter">Editar Pagamento em Lote</h3>
                <p className="text-xs opacity-70 mt-1 uppercase font-bold tracking-widest">NF: {editingInvoicePayment.doc}</p>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  As alterações feitas aqui serão aplicadas a **todos os itens** vinculados a esta nota fiscal.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Nº CH./OB</label>
                    <input 
                      type="text" 
                      value={editingInvoicePayment.payDoc}
                      onChange={(e) => setEditingInvoicePayment({...editingInvoicePayment, payDoc: e.target.value})}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Data do Pagamento</label>
                    <input 
                      type="text" 
                      value={editingInvoicePayment.payDate}
                      onChange={(e) => setEditingInvoicePayment({...editingInvoicePayment, payDate: e.target.value})}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setEditingInvoicePayment(null)}
                    className="flex-1 py-4 bg-surface-container-high text-on-surface font-bold rounded-2xl hover:bg-surface-variant transition-all active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={saveInvoicePayment}
                    className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                  >
                    Salvar em Lote
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
