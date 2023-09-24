import React, { useState } from 'react';
import '../styles/register.css'

export default function MultiStepRegister() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    ConfirmPassword: '',
    // Adicione outros campos aqui
  });

  const handleNextStep = () => {
    // Valide os campos da etapa atual aqui
    if (currentStep === 1 && (formData.name === '' || formData.lastName === '')) {
      // Exiba mensagem de erro se campos obrigatórios não estiverem preenchidos
      return;
    }
    
    if (currentStep === 2 && (formData.email === '' || formData.password === '' || formData.ConfirmPassword === '')) {
      // Validação da segunda etapa
      return;
    }

    // Se tudo estiver válido, avance para a próxima etapa
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    // Volte para a etapa anterior
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            {/* Renderize o componente de acordo com a etapa atual */}
            {currentStep === 1 && (
              <div>
                {/* Campos da primeira etapa */}
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                {/* Campos da segunda etapa */}
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                <input type="password" name="ConfirmPassword" value={formData.ConfirmPassword} onChange={handleInputChange} />
              </div>
            )}

            {/* Botões de navegação */}
            {currentStep > 1 && (
              <button type="button" onClick={handlePreviousStep}>Etapa Anterior</button>
            )}

            {currentStep < 2 && (
              <button type="button" onClick={handleNextStep}>Próxima Etapa</button>
            )}
            
            {currentStep === 2 && (
              <button type="submit">Concluir Registro</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
