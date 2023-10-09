const knex = require("../database/knex")

class AccountController {
    async index(req, res) {
        const user_id = req.user.id
        const infos = await knex("accountUser").where({ user_id }).first()

        if (!infos) {
            return res.send("Usuario nao encontrado")
        }

        return res.send("Account")
    }

    async create(req, res) {
        const { amount, invoiceAmount, paymentData, invoiceClosing, creditCard, loan } = req.body
        const user_id = req.user.id
        const user = await knex("users").where({ id: user_id }).first()
        const account = await knex("accountUser").where({ user_id }).first()

        if (!user) {
            return res.send("usuario nao encontrado")
        }

        if (account) {
            return res.send("Conta ja criada")
        }

        await knex("accountUser").insert({
            amount,
            invoice_amount: invoiceAmount,
            payment_data: paymentData,
            invoice_closing: invoiceClosing,
            credit_card: creditCard,
            loan,
            user_id
        })



        return res.status(201).json()


    }

    async update(req, res) {
        const { amount, invoiceAmount, paymentData, invoiceClosing, creditCard, loan } = req.body
        const user_id = req.user.id
        const account = await knex("accountUser").where({ user_id }).first()

        account.amount = amount ?? account.amount
        account.invoice_amount = invoiceAmount ?? account.invoice_amount
        account.payment_data = paymentData ?? account.payment_data
        account.invoice_closing = invoiceClosing ?? account.invoice_closing
        account.credit_card = creditCard ?? account.credit_card
        account.loan = loan ?? account.loan

        await knex("accountUser").update(account).where({ user_id })

        return res.send("Atualizado")
    }

}

module.exports = AccountController