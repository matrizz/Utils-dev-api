export default function ContactList() {
    return (
        <pre>
            <code>{
                `
    'use client'

import { Contact } from '@/types/contact'

interface ContactListProps {
  contacts: Contact[]
  onEdit: (contact: Contact) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export default function ContactList({ 
  contacts, 
  onEdit, 
  onDelete, 
  isLoading = false 
}: ContactListProps) {
    
  const handleDelete = (contact: Contact) => {
    if (window.confirm(\`Tem certeza que deseja deletar o contato de $\{contact.nome\}?\`)) {
      onDelete(contact.id)
      }
      }
      
      if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
            <p className="text-gray-500">Carregando contatos...</p>
            </div>
            </div>
            )
            }

  if (contacts.length === 0) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Nenhum contato encontrado</p>
          <p className="text-gray-400 text-sm mt-2">
            Adicione seu primeiro contato usando o formulário acima
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
    <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          Meus Contatos ({contacts.length})
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200">
      {contacts.map((contact) => (
          <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
          {/* Informações do contato */}
          <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {contact.nome}
                  </h3>
                  {contact.apelido && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {contact.apelido}
                    </span>
                    )}
                </div>
                
                <div className="space-y-1">
                <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                href={\`tel:$\{contact.telefone}\`}
                      className="hover:text-blue-600 transition-colors"
                      >
                      {contact.telefone}
                      </a>
                  </div>
                  
                  {contact.email && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a 
                        href={\`mailto:$\{contact.email}\`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Botões de ação */}
              <div className="flex gap-2 ml-4">
              <button
                  onClick={() => onEdit(contact)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                  title="Editar contato"
                >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  </button>
                
                <button
                  onClick={() => handleDelete(contact)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                  title="Deletar contato"
                >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                </button>
              </div>
              </div>

              {/* Data de criação */}
            <div className="mt-3 text-xs text-gray-400">
            Adicionado em {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
            </div>
            </div>
            ))}
      </div>
      </div>
      )
      }

      `
            }
            </code>
        </pre>
    )
}