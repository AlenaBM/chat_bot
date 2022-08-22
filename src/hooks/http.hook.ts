import { IMessage } from './../models/MessageModel';
import { useState, useCallback } from "react"

export const useHttp = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const request = useCallback(
		async (url: string, method = "GET", body: { "uuid": string } | { "cuid": string } | number | IMessage | null, headers = {}) => {
			setLoading(true)
			try {
				if (body) {
					body = JSON.stringify(body)
					headers["Content-Type"] = "application/json"
				}

				const response = await fetch(url, { method, body, headers })
				const data = await response.json()

				if (!response.ok) {
					throw new Error(data.message || "Что-то пошло не так")
				}

				return data
                // ReferenceError
			} catch (e) {
				setError(e.message)
				throw e
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	const clearError = useCallback(() => setError(null), [])

	return { loading, request, error, clearError, setLoading }
}
