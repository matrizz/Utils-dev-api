export default function ContactForm() {
    return (
        <pre>
            <code>
                {`
'use client'

import { useState } from 'react'
import { Contact, ContactFormData } from '@/types/contact'

interface ContactFormProps {
  contact?: Contact | null
  onSubmit: (data: ContactFormData) => Promise<void>
  onCancel?: () => void
  isEditing?: boolean
}

export default function ContactForm({ 
  contact, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: contact?.nome || '',
    telefone: contact?.telefone || '',
    email: contact?.email || '',
    apelido: contact?.apelido || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nome.trim() || !formData.telefone.trim()) {
      alert('Nome e telefone são obrigatórios!')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Limpar formulário apenas se não estiver editando
      if (!isEditing) {
        setFormData({ nome: '', telefone: '', email: '', apelido: '' })
      }
    } catch (error) {
      console.error('Erro ao salvar contato:', error)
      alert('Erro ao salvar contato. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {isEditing ? 'Editar Contato' : 'Novo Contato'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
            Nome *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o nome"
          />
        </div>

        {/* Telefone */}
        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone *
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(11) 99999-9999"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="email@exemplo.com"
          />
        </div>

        {/* Apelido */}
        <div>
          <label htmlFor="apelido" className="block text-sm font-medium text-gray-700 mb-1">
            Apelido
          </label>
          <input
            type="text"
            id="apelido"
            name="apelido"
            value={formData.apelido}
            onChange={handleChange}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Como você chama esta pessoa"
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Adicionar')}
        </button>
        
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

                `}
            </code>
        </pre>
    )
}