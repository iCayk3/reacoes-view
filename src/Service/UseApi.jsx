const apiUrl = "http://45.166.30.211:8080/";

export default function UseApi() {
    return async (endpoint, method = "GET", body = null) => {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: body ? JSON.stringify(body) : null
        };

        const response = await fetch(`${apiUrl}${endpoint}`, options);
        if (!response.ok) {
            const error = new Error('Erro na requisição');
            error.status = response.status;
            throw error;

            // throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        return response.json();
    };
}
