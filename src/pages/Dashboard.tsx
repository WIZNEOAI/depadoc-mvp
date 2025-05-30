import React, { useEffect, useState, useCallback } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardNavbar from "@/components/dashboard/Navbar";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import UserCard from "@/components/dashboard/UserCard";
import SubjectProgressCard from "@/components/dashboard/SubjectProgressCard";
import ExamModule from "@/components/exam/ExamModule";
import { useMaterias } from "@/hooks/useMaterias";
import { supabase } from "@/integrations/supabase/client";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { useToast } from "@/hooks/use-toast";
import SubjectDetailView from "@/components/dashboard/SubjectDetailView";
import { useExamStore } from "@/store/examStore";

// User info type
type Usuario = {
  id: string;
  nombre_completo: string;
  escuela_medicina: string;
  plan: string;
  avatar?: string;
  genero?: string;
  year?: string;
  onboarding_completado: boolean;
};

const Dashboard = () => {
  const [materiaActiva, setMateriaActiva] = useState<string | null>(null);
  const [showExamModule, setShowExamModule] = useState(false);
  const {
    MATERIAS_PRIMER,
    MATERIAS_SEGUNDO,
    getUnidadesFromMateria
  } = useMaterias();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [hasClaimedReward, setHasClaimedReward] = useState(false);

  // Obtener datos del store de exámenes para estadísticas
  const { examHistory, getGlobalStats, setUser } = useExamStore();
  const stats = getGlobalStats();

  // 1. On mount, fetch current user & metadata
  useEffect(() => {
    let ignore = false;
    async function fetchUsuario() {
      setLoading(true);
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) {
        window.location.href = "/auth";
        return;
      }
      // Get user row from supabase
      const {
        data: userData
      } = await supabase.from("usuarios").select("*").eq("id", userId).single();
      if (!ignore && userData) {
        setUsuario(userData);
        setNeedsOnboarding(!userData.onboarding_completado);
        
        // Sincronizar con el store de exámenes
        const userPlan = userData.plan === "PLUS" ? "PRO" : "FREE";
        setUser({
          type: userPlan,
          name: userData.nombre_completo,
          email: session.user.email,
          isAuthenticated: true
        });
      }
      setLoading(false);
    }
    fetchUsuario();
    return () => {
      ignore = true;
    };
  }, [setUser]);

  // 2. When onboarding finished, reload user
  const handleOnboardingFinish = useCallback(async () => {
    // Fetch the updated user
    const {
      data: {
        session
      }
    } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    const {
      data: userData
    } = await supabase.from("usuarios").select("*").eq("id", userId).single();
    if (userData) {
      setUsuario(userData);
      setNeedsOnboarding(false);
    }
  }, []);

  // 3. Side effect for hasClaimedReward (simulate, to be replaced by real logic)
  useEffect(() => {
    setHasClaimedReward(false); // Simulación: cambiar luego con lógica real
  }, [usuario]);

  if (loading || !usuario) {
    return <div className="min-h-screen flex items-center justify-center bg-lightgray text-brand text-xl">
        Cargando tu información...
      </div>;
  }

  // Determinar el plan del usuario (FREE por defecto, PRO si tiene plan PLUS)
  const userPlan = usuario.plan === "PLUS" ? "PRO" : "FREE";
  
  // Configurar props de UserCard según el plan
  const userCardProps = {
    escuela: usuario.escuela_medicina,
    año: usuario.year ?? "-",
    semestre: undefined,
    plan: userPlan,
  };

  // Materias con progreso basado en estadísticas reales
  const primerAñoMaterias = MATERIAS_PRIMER.map((m) => ({
    ...m,
    progreso: stats['Bioquímica']?.averageScore ? stats['Bioquímica'].averageScore / 100 : 0,
  }));
  
  const segundoAñoMaterias = MATERIAS_SEGUNDO.map((m) => ({
    ...m,
    progreso: stats['Fisiología']?.averageScore ? stats['Fisiología'].averageScore / 100 : 0,
  }));

  // Función para mostrar el módulo de exámenes
  const handleStartExam = () => {
    setShowExamModule(true);
    setMateriaActiva(null);
  };

  // Función para volver al dashboard
  const handleBackToDashboard = () => {
    setShowExamModule(false);
    setMateriaActiva(null);
  };

  // Función para upgrade a PRO
  const handleUpgradeToPro = () => {
    // Aquí se implementará la integración con Stripe
    window.location.href = "/auth"; // Por ahora redirige a auth
  };

  return <SidebarProvider>
      <div className="min-h-screen h-screen w-full bg-lightgray dark:bg-gray-900 flex flex-col overflow-hidden">
        {needsOnboarding && <OnboardingWizard usuario={usuario} onFinish={handleOnboardingFinish} />}
        <DashboardNavbar user={{
        nombre: usuario.nombre_completo,
        avatar: usuario.avatar ?? ""
      }} />
        <div className={`flex flex-1 w-full h-0 ${needsOnboarding ? "pointer-events-none opacity-30 blur-sm" : ""}`}>
          <DashboardSidebar 
            materias={{
              primero: primerAñoMaterias,
              segundo: segundoAñoMaterias,
            }} 
            materiaActiva={materiaActiva} 
            setMateriaActiva={setMateriaActiva} 
            className="sticky top-0 h-screen z-10"
            showExamModule={showExamModule}
            onBackToDashboard={handleBackToDashboard}
          />
          <SidebarInset>
            <main className="flex-1 h-full overflow-y-auto">
              {showExamModule ? (
                <div className="exam-container bg-lightgray dark:bg-gray-900 min-h-full">
                  <ExamModule />
                </div>
              ) : (
                <div className="px-4 pt-6 pb-24 sm:px-8 lg:px-16 max-w-6xl mx-auto w-full">
                  <div className="space-y-6">

                    <UserCard user={userCardProps} onUpgradeToPro={handleUpgradeToPro} />

                    {/* Card de Exámenes Inteligentes */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border dark:border-gray-700">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-brand dark:text-blue-400 mb-2">Exámenes Inteligentes</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {userPlan === "FREE" 
                            ? "Plan Gratuito: Máximo 3 exámenes por materia, 10 preguntas por examen"
                            : "Plan PRO: Exámenes ilimitados, 25 preguntas por examen"
                          }
                        </p>
                      </div>
                      
                      {/* Estadísticas de exámenes */}
                      {examHistory.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {examHistory.length}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Exámenes realizados</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                              {stats['Bioquímica']?.averageScore || 0}%
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Promedio Bioquímica</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                              {stats['Fisiología']?.averageScore || 0}%
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Promedio Fisiología</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                              {stats['Bioquímica']?.correctAnswers + stats['Fisiología']?.correctAnswers || 0}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Respuestas correctas</div>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleStartExam}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 font-semibold shadow-md"
                      >
                        Iniciar Exámenes
                      </button>
                    </div>

                    {/* Layout de materias */}
                    {!materiaActiva
                      ? (
                          <div className="space-y-8">
                            {/* BLOQUE PRIMER AÑO */}
                            <div>
                              <h2 className="mb-3 text-lg md:text-xl font-bold text-brand dark:text-blue-400">Materias primer año</h2>
                              <div className="grid gap-4 sm:grid-cols-2">
                                {primerAñoMaterias.map((materia) =>
                                  <SubjectProgressCard key={materia.nombre} materia={materia} />)}
                              </div>
                            </div>
                            {/* BLOQUE SEGUNDO AÑO */}
                            <div>
                              <h2 className="mb-3 text-lg md:text-xl font-bold text-brand dark:text-blue-400">Materias segundo año</h2>
                              <div className="grid gap-4 sm:grid-cols-2">
                                {segundoAñoMaterias.map((materia) =>
                                  <SubjectProgressCard key={materia.nombre} materia={materia} />)}
                              </div>
                            </div>
                          </div>
                      )
                      : (
                        <SubjectDetailView subject={materiaActiva} units={getUnidadesFromMateria(materiaActiva)} />
                      )
                    }
                  </div>
                </div>
              )}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>;
};

export default Dashboard;