<script>
export default {
  asyncData({ redirect }) {
    // Redirigir a peso-chileno por defecto (301 = permanente para SEO)
    return redirect(301, '/precio/peso-chileno')
  }
}
</script>

