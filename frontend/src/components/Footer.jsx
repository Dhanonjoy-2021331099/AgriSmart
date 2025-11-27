import { useAppSettings } from '../Contexts/AppSettingsContext';

export default function Footer(){
  const { getText } = useAppSettings();
  const t = (bn, en) => getText(bn, en);

  return (
    <footer style={{textAlign:'center',padding:16,marginTop:28,color:'var(--text-color)'}}>
      © {new Date().getFullYear()} Smart Agri — {t('React ও Vite দিয়ে নির্মিত', 'Built with React & Vite')}
    </footer>
  );
}
